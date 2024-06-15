import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    // width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f3f3",
  },
  tableCol: {
    width: "25%",
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
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
});

const PDFDocument = ({ order, customer, worker }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Order Details</Text>
      <View style={styles.section}>
        <Text>Order ID: {order._id}</Text>
        <Text>Customer: {customer}</Text>
        <Text>Date: {new Date(order.date).toLocaleString()}</Text>
        <Text>Worker: {worker}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
        </View>
        {order.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.totalText}>
        Total: $
        {order.items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </Text>
    </Page>
  </Document>
);

export default PDFDocument;
