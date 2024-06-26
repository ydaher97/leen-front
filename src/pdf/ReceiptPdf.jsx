// src/pdf/ReceiptPdf.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import rubikFont from "../assets/fonts/Rubik-VariableFont_wght.ttf";

// Register custom font
Font.register({
  family: "Rubik",
  src: rubikFont,
  fontWeight: "normal",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Rubik",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
    textAlign: "right",
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f3f3",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: "right",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
});

const ReceiptPdf = ({ receipt, customer, worker }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>פרטי קבלה</Text>
      <View style={styles.section}>
        <Text> {receipt._id} :מספר קבלה</Text>
        <Text> {customer} :לקוח</Text>
        <Text> {new Date(receipt.date).toLocaleString()} :תאריך</Text>
        <Text> {worker} :עובד</Text>
        <Text> {receipt.paymentType} :סוג תשלום</Text>
        <Text> {receipt.bank} :בנק</Text>
        <Text> ₪{receipt.amount.toFixed(2)} :סכום</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPdf;
