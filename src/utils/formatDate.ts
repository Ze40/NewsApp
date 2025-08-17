import {
  format,
  formatDistanceToNow,
  differenceInDays,
  parseISO,
  isFuture,
} from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (isoDate?: string): string => {
  if (!isoDate) return '';

  const date = parseISO(isoDate);

  if (isFuture(date)) {
    return format(date, 'd MMMM yyyy', { locale: enUS });
  }

  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff <= 7) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: enUS,
    });
  }

  return format(date, 'd MMMM yyyy', { locale: enUS });
};
