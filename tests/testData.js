export const firstNames = [
  "Arjun", "Rahul", "Sita", "Ananya", "Rohit",
  "Kiran", "Meera", "Vikram", "Neha", "Amit",
  "Priya", "Aditya", "Divya", "Karthik", "Aishwarya",
  "Sanjay", "Pooja", "Vivek", "Lakshmi", "Siddharth",
  "Riya", "Arnav", "Shreya", "Aarav", "Tanvi",
  "Vihaan", "Isha", "Krishna", "Nisha", "Ayaan"
];

export const lastNames = [
  "Sharma", "Reddy", "Iyer", "Patel", "Verma",
  "Gupta", "Nair", "Das", "Mehta", "Singh",
  "Kumar", "Devi", "Yadav", "Rao", "Joshi",
  "Khan", "Agarwal", "Jain", "Mishra", "Chopra",
  "Malhotra", "Kapoor", "Pillai", "Banerjee", "Chatterjee",
  "Rajput", "Dubey", "Pandey", "Srivastava"
];

export const cities = [
  "Bengaluru", "Hyderabad", "Chennai", "Mumbai",
  "Delhi", "Pune", "Kolkata", "Ahmedabad", "Surat",
  "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra",
  "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi"
]; 

export const donationTypes = [
  "Annadaan",
  "Sponsor a Child",
  "Vidyadaan"
];

export const amounts = [
  100, 250, 500, 750, 1000,
  1500, 2000, 3000, 5000
];

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
