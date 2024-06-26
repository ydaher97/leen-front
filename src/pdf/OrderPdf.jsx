import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import rubikFont from "../assets/fonts/Rubik-VariableFont_wght.ttf";
import { calculateBeforeTax, calculateTotal } from "../utils/calculations";
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

const PDFDocument = ({ order, customer, worker }) => {
  const total = calculateTotal(order.items);
  const totalBeforeTax = calculateBeforeTax(total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>פרטי הזמנה</Text>
        <View style={styles.section}>
          <Text> {order._id} :מספר הזמנה</Text>
          <Text> {customer} :לקוח</Text>
          <Text> {new Date(order.date).toLocaleString()}: תאריך</Text>
          <Text> {worker} :עובד</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>סה"כ</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>סה"כ לפני מס</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>מחיר</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>כמות</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>שם</Text>
            </View>
          </View>
          {order.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  ₪{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  ₪{((item.price * item.quantity) / 1.175).toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>₪{item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.totalText}>סה"כ לפני מס: ₪{totalBeforeTax}</Text>
        <Text style={styles.totalText}>סה"כ: ₪{total}</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
