//old pdf page, original
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
// import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4', 
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    textAlign: 'center', 
    marginTop:"30px",  
    
  }
});

// Create Document Component
const MyDocument = ({items, allitems}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section} >

        <Text style={{textAlign:"center"}}>Todo Item:</Text>
        {allitems.map((item, index) => (
            <Text key={index}  >{item}</Text>
          ))}
          <Text style={{textAlign:"center"}}>{items}</Text>


          {/* new pdf */}
          {/* <Grid item md={12}>
              <TextField
                fullWidth
                id="filled-required"
                required
                label="Name"
                variant="filled"
                // value={form.name}
                // onChange={(e) => handleInputChange("name", e.target.value)}
                // inputProps={{ maxLength: 32 }}
              />
            </Grid> */}
      
      </View>
    </Page>
  </Document>
);

export default MyDocument;