import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// import LogoImage from "../";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 7,
    // textAlign: "center",
  },
  text: {
    marginLeft: 15,
    marginTop: 5,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

export const PDFFile = ({ groceryListIngredients }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            style={styles.image}
            src={process.env.PUBLIC_URL + "/images/Y’alldis_logo.png"}
          />
          <Text style={styles.title}>My Grocery List:</Text>
          {groceryListIngredients.map((item) => (
            <Text style={styles.text} key={item.id}>
              {item.name}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
