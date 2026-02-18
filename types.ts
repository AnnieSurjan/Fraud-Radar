
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  VIEWER = 'VIEWER',
}

export enum TransactionType {
  INVOICE = 'Invoice',
  BILL = 'Bill',
  PAYMENT = 'Payment',
  JOURNAL = 'JournalEntry',
  PURCHASE = 'Purchase',
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  type: TransactionType;
  entityName: string;
  account: string;
  memo?: string;
  status: 'pending' | 'reviewed' | 'flagged' | 'cleared';
  recordedBy?: string;
  timestamp?: string; 
  sourceUrl?: string; // Deep link to QB or Xero
}

export interface AnomalyGroup {
  id: string;
  reason: string;
  explanation: string;
  riskScore: number; 
  riskLevel: RiskLevel;
  transactions: Transaction[];
  category: 'Splitting' | 'Unusual Amount' | 'New Vendor' | 'Time Anomaly' | 'Duplicate';
  investigationStatus?: 'open' | 'investigating' | 'dismissed' | 'resolved';
}

export interface ScanResult {
  id: string;
  date: string;
  anomaliesFound: number;
  totalRiskExposure: number;
  status: 'Completed' | 'Failed' | 'Running';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  companyName: string;
  isQuickBooksConnected?: boolean;
  isXeroConnected?: boolean;
  isTrial?: boolean;
  reportFrequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Never';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  time: string;
  targetTab?: string;
}

export interface AuditLogEntry {
  id: string;
  time: string;
  user: string;
  action: string;
  details: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}

export interface DetectionRule {
  id: string;
  type: 'ExcludeVendor' | 'AmountThreshold' | 'AccountWhiteList';
  value: string;
  isActive: boolean;
}
