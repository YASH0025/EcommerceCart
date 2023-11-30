// import React, { useState } from "react";

// // Currency conversion rates
// const conversionRates = {
//   USD: 1, 
//   EUR: 0.85, 
//   INR: 75.0, 
// };

// const CurrencyConverter: React.FC<{ cartItems: CartItem[] }> = ({
//   cartItems,
// }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState("USD");

//   const handleCurrencyChange = (currency: string) => {
//     setSelectedCurrency(currency);
//   };

//   const convertCurrency = (
//     amount: number,
//     fromCurrency: string,
//     toCurrency: string
//   ) => {
//     const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
//     return (amount * rate).toFixed(2);
//   };

//   // Calculate total price in USD from cart items
//   const totalUSD = cartItems
//     .reduce((total, item) => total + item.price * item.quantity, 0)
//     .toFixed(2);

//   return (
//     <div>
//       <h3>Total Price in {selectedCurrency}</h3>
//       <p>${totalUSD} USD</p>
//       <select
//         onChange={(e) => handleCurrencyChange(e.target.value)}
//         value={selectedCurrency}
//       >
//         {Object.keys(conversionRates).map((currency) => (
//           <option key={currency} value={currency}>
//             {currency}
//           </option>
//         ))}
//       </select>
//       <p>
//         {`Total Price: ${convertCurrency(
//           Number(totalUSD),
//           "USD",
//           selectedCurrency
//         )} ${selectedCurrency}`}
//       </p>
//     </div>
//   );
// };

// export default CurrencyConverter;
