import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { contactsStore } from "src/store/contactsStore";

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [resultContact, setresultContact] = useState<ContactDto>();
  const { items: contacts, loading: isLoading, error } = contactsStore;
  useEffect(() => {
    if (contacts) {
      setresultContact(contacts.find(({ id }) => id === contactId));
    }
  }, [contactId, contacts]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {resultContact ? <ContactCard contact={resultContact} /> : <Empty />}
      </Col>
    </Row>
  );
};
