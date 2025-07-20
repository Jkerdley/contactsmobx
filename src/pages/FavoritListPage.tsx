import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { ContactDto } from "src/types/dto/ContactDto";
import { useGetContactsQuery } from "src/store/api";
import { useAppSelector } from "src/hooks";
import { RootState } from "src/store/store";

export const FavoritListPage = () => {
    const { items } = useAppSelector((state: RootState) => state.favorites);
    const { data: contacts, isLoading, error } = useGetContactsQuery();
    const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);

    useEffect(() => {
        if (contacts) {
            const favContacts = contacts.filter((contact) => items.includes(contact.id));
            setFilteredContacts(favContacts);
        }
    }, [contacts, items]);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = "status" in error ? String(error.status) : "Неизвестная ошибка";
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Row xxl={4} className="g-4">
            {filteredContacts.map((contact) => (
                <Col key={contact.id}>
                    <ContactCard contact={contact} withLink />
                </Col>
            ))}
        </Row>
    );
};
