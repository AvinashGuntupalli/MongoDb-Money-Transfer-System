import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async logTransaction(data: {
    senderPhone: string;
    receiverPhone: string;
    amount: number;
    status: 'SUCCESS' | 'FAILED';
    message?: string;
  }) {
    return this.transactionModel.create(data);
  }
  // Get transaction history by phone numbers
  async getTransactions(filter?: {
    senderPhone?: string;
    receiverPhone?: string;
  }) {
    const query = {};
    if (filter?.senderPhone) {
      Object.assign(query, { senderPhone: filter.senderPhone });
    }
    if (filter?.receiverPhone) {
      Object.assign(query, { receiverPhone: filter.receiverPhone });
    }
    return this.transactionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  // Get total amount sent and received by a phone number - Aggregation
  async getTransactionSummary(phone: string) {
    const [summary] = await this.transactionModel.aggregate([
      {
        $facet: {
          totalSent: [
            { $match: { senderPhone: phone } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ],
          totalReceived: [
            { $match: { receiverPhone: phone } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ],
        },
      },
      {
        $project: {
          totalSent: {
            $ifNull: [{ $arrayElemAt: ['$totalSent.total', 0] }, 0],
          },
          totalReceived: {
            $ifNull: [{ $arrayElemAt: ['$totalReceived.total', 0] }, 0],
          },
        },
      },
    ]);

    return summary;
  }

  //Get top 5 users who sent the most money - Aggregation
  async getTopSenders(limit = 5) {
    return this.transactionModel.aggregate([
      { $match: { status: 'SUCCESS' } },
      {
        $group: {
          _id: '$senderPhone',
          totalSent: { $sum: '$amount' },
          transactionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSent: -1 } },
      { $limit: limit },
    ]);
  }

  //Get top N receivers by amount received - Aggregation
  async getTopReceivers() {
    return this.transactionModel.aggregate([
      { $match: { status: 'SUCCESS' } },
      {
        $group: {
          _id: '$receiverPhone',
          totalReceived: { $sum: '$amount' },
        },
      },
      { $sort: { totalReceived: -1 } },
      {
        $project: {
          _id: 0,
          receiverPhone: '$_id',
          totalReceived: 1,
        },
      },
    ]);
  }

  //Get daily transaction summary (total & count)- aggregation
  async getDailyTransactionSummary() {
    return this.transactionModel.aggregate([
      {
        $match: { status: 'SUCCESS' }, // Only successful transactions
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }, // Group by date
          },
          totalAmount: { $sum: '$amount' },
          transactionCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          totalAmount: 1,
          transactionCount: 1,
        },
      },
      {
        $sort: { date: -1 }, // Sort by date descending
      },
    ]);
  }

  //Get all transactions on a specific date- aggregation
  async getTransactionsByDate(date: string, phone?: string) {
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const query: any = {
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    };

    if (phone) {
      query.$or = [{ senderPhone: phone }, { receiverPhone: phone }];
    }

    return this.transactionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  // Paginated transaction history for a phone number
  async getAllTransactionHistory(phone: string, page = 1, limit = 5) {
    const skip = (page - 1) * limit;

    const [results, totalCount] = await Promise.all([
      this.transactionModel.aggregate([
        {
          $match: {
            $or: [{ senderPhone: phone }, { receiverPhone: phone }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $addFields: {
            type: {
              $cond: [{ $eq: ['$senderPhone', phone] }, 'SENT', 'RECEIVED'],
            },
            counterparty: {
              $cond: [
                { $eq: ['$senderPhone', phone] },
                '$receiverPhone',
                '$senderPhone',
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            type: 1,
            counterparty: 1,
            amount: 1,
            status: 1,
            date: '$createdAt',
          },
        },
      ]),
      this.transactionModel.countDocuments({
        $or: [{ senderPhone: phone }, { receiverPhone: phone }],
      }),
    ]);

    return {
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
      totalRecords: totalCount,
      data: results,
    };
  }

  async findUserTransactions(userId: string) {
    return this.transactionModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
      .sort({ createdAt: -1 });
  }
}
