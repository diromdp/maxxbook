import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
   return twMerge(clsx(inputs))
}


export function kFormatter(num) {
   if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K';
   } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
   } else if (num < 900) {
      return num;
   }
}

export function formatDateToIndonesian(numericDate) {
   let year = numericDate.substring(0, 4);
   let month = numericDate.substring(4, 6);
   let day = numericDate.substring(6, 8);

   let date = new Date(year, month - 1, day);

   let options = { year: 'numeric', month: 'long', day: 'numeric' };
   return date.toLocaleDateString('id-ID', options);
}
export function formatRupiah(number) {
   let reverse = number.toString().split('').reverse().join('');
   let rupiah = reverse.match(/\d{1,3}/g);
   rupiah = rupiah.join('.').split('').reverse().join('');
   return number < 0 ? `-Rp ${rupiah}` : `Rp ${rupiah}`;
}
export function getInitials(fullName) {
   if (!fullName) return '';

   const nameParts = fullName.trim().split(/\s+/); // Split by one or more spaces
   const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');

   return initials;
}

export const getLocalStorageItem = (key) => {
   if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem(key));
   }
   return null;
};

export const setLocalStorageItem = (key, value) => {
   if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
   }
};

export const removeLocalStorageItem = (key) => {
   if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
   }
};

export const hasLocalStorageItem = (key) => {
   if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key) !== null;
   }
   return false;
};

export function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDateToDatabaseString(date = new Date()) {
   let year = date.getFullYear();
   let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, pad single digit months with leading zero
   let day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with leading zero
   let hours = String(date.getHours()).padStart(2, '0'); // Pad single digit hours with leading zero
   let minutes = String(date.getMinutes()).padStart(2, '0'); // Pad single digit minutes with leading zero
   let seconds = String(date.getSeconds()).padStart(2, '0'); // Pad single digit seconds with leading zero

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function formatNumber(num) {
   const absNum = Math.abs(num);
   if (absNum >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
   } else if (absNum >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
   } else if (absNum >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
   }
   return num.toString();
}