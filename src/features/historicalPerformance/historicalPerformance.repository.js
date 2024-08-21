const HistoricalPerformance = require("./historicalPerformance.schema");

class HistoricalPerformanceRepository {
  async create(data) {
    const hisPer = await HistoricalPerformance.create(data);
    return hisPer;
  }
}
module.exports = HistoricalPerformanceRepository;
