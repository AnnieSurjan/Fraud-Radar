
import { Transaction, TransactionType, AnomalyGroup, RiskLevel, ScanResult } from "../types";

export const MOCK_TRANSACTIONS: Transaction[] = [
  // Splitting pattern
  { 
    id: 'TXN-S1', date: '2023-11-20', amount: 450.00, currency: 'USD', type: TransactionType.PURCHASE, 
    entityName: 'Office Max', account: 'Supplies', recordedBy: 'John Smith', timestamp: '2023-11-20 10:00', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/expense?txnId=10234'
  },
  { 
    id: 'TXN-S2', date: '2023-11-20', amount: 480.00, currency: 'USD', type: TransactionType.PURCHASE, 
    entityName: 'Office Max', account: 'Supplies', recordedBy: 'John Smith', timestamp: '2023-11-20 10:05', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/expense?txnId=10235'
  },
  { 
    id: 'TXN-S3', date: '2023-11-20', amount: 420.00, currency: 'USD', type: TransactionType.PURCHASE, 
    entityName: 'Office Max', account: 'Supplies', recordedBy: 'John Smith', timestamp: '2023-11-20 10:10', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/expense?txnId=10236'
  },
  
  // Unusual time
  { 
    id: 'TXN-T1', date: '2023-11-19', amount: 2500.00, currency: 'USD', type: TransactionType.BILL, 
    entityName: 'IT Services Ltd', account: 'Professional Fees', recordedBy: 'Admin', timestamp: '2023-11-19 23:45', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/bill?txnId=9928'
  },

  // New vendor, round amount
  { 
    id: 'TXN-N1', date: '2023-11-15', amount: 5000.00, currency: 'USD', type: TransactionType.BILL, 
    entityName: 'New Consulting Group', account: 'Legal', recordedBy: 'Anna White', timestamp: '2023-11-15 14:00', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/bill?txnId=8841'
  },

  // Normal transaction
  { 
    id: 'TXN-OK1', date: '2023-11-10', amount: 120.00, currency: 'USD', type: TransactionType.PURCHASE, 
    entityName: 'Starbucks', account: 'Travel', recordedBy: 'John Smith', timestamp: '2023-11-10 08:30', status: 'pending',
    sourceUrl: 'https://app.qbo.intuit.com/app/expense?txnId=7712'
  },
];

export const MOCK_SCAN_HISTORY: ScanResult[] = [
  { id: 'SC-1001', date: '2023-11-20', anomaliesFound: 3, totalRiskExposure: 1350, status: 'Completed' },
  { id: 'SC-1002', date: '2023-11-19', anomaliesFound: 1, totalRiskExposure: 2500, status: 'Completed' },
  { id: 'SC-1003', date: '2023-11-15', anomaliesFound: 1, totalRiskExposure: 5000, status: 'Completed' },
];

export const detectAnomalies = (transactions: Transaction[]): AnomalyGroup[] => {
  const groups: AnomalyGroup[] = [];
  
  // 1. Splitting Detection
  const vendorGroups: Record<string, Transaction[]> = {};
  transactions.forEach(t => {
    const key = `${t.entityName}-${t.date}`;
    if (!vendorGroups[key]) vendorGroups[key] = [];
    vendorGroups[key].push(t);
  });

  Object.values(vendorGroups).forEach(group => {
    if (group.length >= 3) {
      groups.push({
        id: `ANOM-SPLIT-${Date.now()}`,
        reason: 'Suspicious Transaction Splitting',
        explanation: 'Multiple small transactions for the same vendor on the same day. This pattern is often used to circumvent internal approval limits.',
        riskScore: 85,
        riskLevel: RiskLevel.HIGH,
        transactions: group,
        category: 'Splitting',
        investigationStatus: 'open'
      });
    }
  });

  // 2. Time Anomaly
  transactions.forEach(t => {
    if (t.timestamp) {
      const hour = parseInt(t.timestamp.split(' ')[1].split(':')[0]);
      const isWeekend = new Date(t.date).getDay() === 0 || new Date(t.date).getDay() === 6;
      if (hour > 22 || hour < 5 || isWeekend) {
          groups.push({
            id: `ANOM-TIME-${t.id}`,
            reason: 'Unusual Processing Time',
            explanation: `This record was created at an unusual time (${t.timestamp}), falling outside normal business hours. User permissions should be verified.`,
            riskScore: 60,
            riskLevel: RiskLevel.MEDIUM,
            transactions: [t],
            category: 'Time Anomaly',
            investigationStatus: 'open'
          });
      }
    }
  });

  // 3. Round amounts / High value
  transactions.forEach(t => {
      if (t.amount >= 5000 && t.amount % 1000 === 0) {
          groups.push({
            id: `ANOM-VAL-${t.id}`,
            reason: 'High-Risk Payment Pattern',
            explanation: 'Large, rounded payment to a non-regular vendor. Common pattern in fictitious invoicing schemes.',
            riskScore: 90,
            riskLevel: RiskLevel.CRITICAL,
            transactions: [t],
            category: 'Unusual Amount',
            investigationStatus: 'open'
          });
      }
  });

  return groups;
};
