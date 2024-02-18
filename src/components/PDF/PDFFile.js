import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
    fontSize: 18,
    marginBottom: 7,
  },
  text: {
    marginLeft: 15,
    marginTop: 5,
    fontSize: 12,
    textAlign: "justify",
  },
  image: {
    marginVertical: 3,
    marginHorizontal: 100,
    maxWidth: 400,
  },
});

export const PDFFile = ({ groceryListIngredients }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            style={styles.image}
            src={process.env.PUBLIC_URL + "/images/Yalldis-logo-light.png"}
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
