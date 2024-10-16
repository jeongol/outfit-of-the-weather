import React from "react";

interface DateAndTimeProps {
  createDate: string;
  newDate: string | null;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({ createDate, newDate }) => {
  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return "방금 전";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}분 전`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}시간 전`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days}일 전`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months}달 전`;
    }
    const years = Math.floor(months / 12);
    return `${years}년 전`;
  };

  const timestamp = new Date(createDate).getTime();

  return (
    <div className="flex flex-row gap-1">
      <div>{formatRelativeTime(timestamp)}</div>
      {newDate && <div className="font-semibold">(수정됨)</div>}
    </div>
  );
};

export default DateAndTime;

export const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
