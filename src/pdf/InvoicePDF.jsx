// src/pdf/InvoicePdf.js

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    direction: "rtl",
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 5,
    border: "1px solid black",
    textAlign: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
});

const InvoicePDF = ({ invoice, customer, worker }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>חשבונית</Text>
      </View>
      <View style={styles.section}>
        <Text>מספר חשבונית: {invoice._id}</Text>
        <Text>לקוח: {customer}</Text>
        <Text>תאריך: {new Date(invoice.date).toLocaleString()}</Text>
        <Text>עובד: {worker}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>שם מוצר</Text>
          <Text style={styles.tableCell}>כמות</Text>
          <Text style={styles.tableCell}>מחיר</Text>
          <Text style={styles.tableCell}>סך הכל</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>₪{item.price.toFixed(2)}</Text>
            <Text style={styles.tableCell}>
              ₪{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.total}>
        סך הכל: ₪
        {invoice.items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </Text>
    </Page>
  </Document>
);

export default InvoicePDF;
