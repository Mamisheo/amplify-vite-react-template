export function getCurrentWeek(): { weekNumber: number; year: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + start.getDay() + 1) / 7);
  
  return {
    weekNumber,
    year: now.getFullYear()
  };
}

export function getWeekDateRange(weekNumber: number, year: number): { start: Date; end: Date } {
  const start = new Date(year, 0, 1);
  const startDay = start.getDay();
  const daysToAdd = (weekNumber - 1) * 7 - startDay;
  
  const weekStart = new Date(year, 0, 1 + daysToAdd);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  return { start: weekStart, end: weekEnd };
}

export function formatWeekRange(weekNumber: number, year: number): string {
  const { start, end } = getWeekDateRange(weekNumber, year);
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()}-${end.getDate()}, ${year}`;
  } else {
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
  }
}