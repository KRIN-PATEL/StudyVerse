import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const logoUrl =
  "https://res.cloudinary.com/krinpatel/image/upload/v1742777966/cover_x3hke6.png";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    marginBottom: 6,
  },
  brandText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  brandSubtext: {
    textAlign: "center",
    fontSize: 10,
    color: "#333",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  value: {
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #ccc",
    paddingBottom: 6,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottom: "1pt solid #eee",
  },
  col1: { width: "40%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "center" },
  col4: { width: "20%", textAlign: "right" },
  totals: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 4,
  },
  totalAmount: {
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    padding: 6,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    width: 250,
  },
  note: {
    backgroundColor: "#fff8e1",
    padding: 8,
    marginTop: 15,
    fontSize: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#888",
    marginTop: 20,
    borderTop: "1px solid #eee",
    paddingTop: 10,
  },
});

export const InvoiceDocument = ({
  name,
  email,
  course,
  amount,
  date,
  paymentId,
  invoiceId,
}) => {
  const quantity = 1;
  const unitPrice = amount;
  const subTotal = amount;
  const discount = 0;
  const tax = 0;
  const total = subTotal - discount + tax;

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { style: styles.page },

      React.createElement(
        View,
        { style: styles.logoContainer },
        React.createElement(Image, { src: logoUrl, style: styles.logo }),
        React.createElement(Text, { style: styles.brandText }, "StudyVerse"),
        React.createElement(
          Text,
          { style: styles.brandSubtext },
          "108 Learning Way, Waterloo Campus, Waterloo, Canada"
        ),
        React.createElement(
          Text,
          { style: styles.brandSubtext },
          "support@studyverse.com"
        )
      ),

      React.createElement(
        View,
        { style: styles.section },

        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            null,
            React.createElement(Text, { style: styles.label }, "Bill To:"),
            React.createElement(Text, null, name),
            React.createElement(Text, null, email),

            React.createElement(
              View,
              { style: { marginTop: 10 } },
              React.createElement(Text, { style: styles.label }, "Invoice No:"),
              React.createElement(Text, null, invoiceId)
            ),

            React.createElement(
              View,
              { style: { marginTop: 6 } },
              React.createElement(Text, { style: styles.label }, "Date:"),
              React.createElement(Text, null, date)
            ),

            React.createElement(
              View,
              { style: { marginTop: 6 } },
              React.createElement(Text, { style: styles.label }, "Payment ID:"),
              React.createElement(Text, null, paymentId)
            )
          )
        )
      ),

      React.createElement(
        View,
        { style: styles.tableHeader },
        React.createElement(Text, { style: styles.col1 }, "Product"),
        React.createElement(Text, { style: styles.col2 }, "Qty"),
        React.createElement(Text, { style: styles.col3 }, "Unit Price"),
        React.createElement(Text, { style: styles.col4 }, "Amount")
      ),

      React.createElement(
        View,
        { style: styles.tableRow },
        React.createElement(Text, { style: styles.col1 }, course),
        React.createElement(Text, { style: styles.col2 }, `${quantity}`),
        React.createElement(Text, { style: styles.col3 }, `$${unitPrice}`),
        React.createElement(Text, { style: styles.col4 }, `$${unitPrice}`)
      ),

      React.createElement(
        View,
        { style: styles.totals },
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(Text, null, "Subtotal:"),
          React.createElement(Text, null, `$${subTotal}`)
        ),
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(Text, null, "Discount:"),
          React.createElement(Text, null, `$${discount}`)
        ),
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(Text, null, "Tax:"),
          React.createElement(Text, null, `$${tax}`)
        ),
        React.createElement(
          Text,
          { style: styles.totalAmount },
          `Total: $${total}`
        )
      ),

      React.createElement(
        View,
        { style: styles.note },
        React.createElement(
          Text,
          null,
          "Note: This is your official invoice. Please keep it for your records."
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(
          Text,
          { style: { fontWeight: "bold" } },
          "Terms & Conditions"
        ),
        React.createElement(
          Text,
          null,
          "Payment is non-refundable and includes lifetime course access."
        )
      )
    )
  );
};
