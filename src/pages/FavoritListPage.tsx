import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { ContactDto } from "src/types/dto/ContactDto";
import { observer } from "mobx-react-lite";
import { contactsStore } from "src/store/contactsStore";
import { favoritesStore } from "src/store/favoritesStore";

export const FavoritListPage = observer(() => {
  const { items } = favoritesStore;
  const { items: contacts, loading: isLoading, error } = contactsStore;
  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    if (contacts) {
      const favContacts = contacts.filter((contact) =>
        items.includes(contact.id)
      );
      setFilteredContacts(favContacts);
    }
  }, [contacts, items]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Row xxl={4} className="g-4">
      {filteredContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
