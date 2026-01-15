import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#1a202c' },
  header: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  subHeader: { fontSize: 9, color: '#4f46e5', marginBottom: 20, borderBottom: 1, borderBottomColor: '#e5e7eb', paddingBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#111827', backgroundColor: '#f3f4f6', padding: 4, marginTop: 15, marginBottom: 8, textTransform: 'uppercase' },
  content: { lineHeight: 1.6, color: '#4b5563', textAlign: 'justify' }
});

export const MyResumePDF = ({ data, coverLetter }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{data.fullName || "NAME"}</Text>
      <Text style={styles.subHeader}>{data.jobTitle} | {data.email}</Text>
      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.content}>{data.experience}</Text>
    </Page>
    {coverLetter && (
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{data.fullName}</Text>
        <Text style={styles.sectionTitle}>Cover Letter</Text>
        <Text style={styles.content}>{coverLetter}</Text>
      </Page>
    )}
  </Document>
);