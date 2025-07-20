import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useGetContactsQuery } from "src/store/api";

export const ContactPage = () => {
    const { contactId } = useParams<{ contactId: string }>();
    const [resultContact, setresultContact] = useState<ContactDto>();
    const { data: contacts, isLoading, error } = useGetContactsQuery();

    useEffect(() => {
        if (contacts) {
            setresultContact(contacts.find(({ id }) => id === contactId));
        }
    }, [contactId, contacts]);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = "status" in error ? error.status : "НЕизвестная ошибка";
        return <div>Error: {errorMessage}</div>;
    }
    return (
        <Row xxl={3}>
            <Col className={"mx-auto"}>
                {resultContact ? <ContactCard contact={resultContact} /> : <Empty />}
            </Col>
        </Row>
    );
};
