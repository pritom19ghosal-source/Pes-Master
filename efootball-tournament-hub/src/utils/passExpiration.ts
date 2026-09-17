import { RegistrationRecord, PASS_EXPIRATION_MS } from '../types';

/**
 * Returns true if the pass has passed its 12-hour validity window.
 */
export function isPassExpired(record: RegistrationRecord): boolean {
  const now = Date.now();
  if (record.expiresAtTimestamp) {
    return now >= record.expiresAtTimestamp;
  }
  if (record.createdAtTimestamp) {
    return now - record.createdAtTimestamp >= PASS_EXPIRATION_MS;
  }
  // Fallback parsing registeredAt string
  if (record.registeredAt) {
    const parsed = new Date(record.registeredAt).getTime();
    if (!isNaN(parsed)) {
      return now - parsed >= PASS_EXPIRATION_MS;
    }
  }
  return false;
}

/**
 * Filters out all expired passes, returning only active passes under 12 hours.
 */
export function filterActivePasses(records: RegistrationRecord[]): RegistrationRecord[] {
  return records.filter((rec) => !isPassExpired(rec));
}

/**
 * Guarantees that createdAtTimestamp and expiresAtTimestamp are set for every pass.
 */
export function ensurePassTimestamps(record: RegistrationRecord): RegistrationRecord {
  const now = Date.now();
  let created = record.createdAtTimestamp;
  if (!created && record.registeredAt) {
    const parsed = new Date(record.registeredAt).getTime();
    created = !isNaN(parsed) ? parsed : now;
  }
  if (!created) {
    created = now;
  }

  const expires = record.expiresAtTimestamp || (created + PASS_EXPIRATION_MS);

  return {
    ...record,
    createdAtTimestamp: created,
    expiresAtTimestamp: expires,
  };
}

/**
 * Returns a human-readable countdown string for the 12-hour pass validity.
 */
export function getPassTimeRemaining(record: RegistrationRecord): {
  isExpired: boolean;
  displayText: string;
  hours: number;
  minutes: number;
} {
  const now = Date.now();
  let expiry = record.expiresAtTimestamp;

  if (!expiry) {
    const created = record.createdAtTimestamp || (record.registeredAt ? new Date(record.registeredAt).getTime() : now);
    expiry = (isNaN(created) ? now : created) + PASS_EXPIRATION_MS;
  }

  const diff = expiry - now;

  if (diff <= 0) {
    return {
      isExpired: true,
      displayText: 'Expired (12h exceeded)',
      hours: 0,
      minutes: 0,
    };
  }

  const totalMinutes = Math.max(1, Math.floor(diff / (1000 * 60)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let displayText = '';
  if (hours > 0) {
    displayText = `${hours}h ${minutes}m left`;
  } else {
    displayText = `${minutes}m left`;
  }

  return {
    isExpired: false,
    displayText,
    hours,
    minutes,
  };
}
