export default class KpiEval {
  constructor(options = {}) {
    this.stat = options.stat;
    this.kpi = options.kpi;
    this.bound = options.kpi.bound.toLowerCase();
    this.value = options.value;
    this.compareWith = options.compareWith;
  }

  isInViolation() {
    switch (this.bound) {
      case "higher":
        return this.value > this.kpi.value;
      case "lower":
        return this.value < this.kpi.value;
      case "percentage":
        if (this.compareWith) {
          const diff = this.value - this.compareWith;
          const percentage = diff / this.value;
          const comparePercentage = this.kpi.value / 100;
          return percentage < comparePercentage;
        }
      default:
        return false;
    }
  }

  isExceedingTarget() {
    switch (this.bound) {
      case "percentage":
        if (this.compareWith) {
          const diff = this.value - this.compareWith;
          const percentage = diff / this.value;
          const comparePercentage = this.kpi.value / 100;
          return percentage > comparePercentage;
        }
      default:
        return false;
    }
  }
}