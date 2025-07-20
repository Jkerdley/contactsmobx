import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { useFilteredContacts } from "src/hooks";
import { FilterForm } from "src/components/FilterForm";
import { useGetContactsQuery, useGetGroupsQuery } from "src/store/api";

export const ContactListPage = () => {
    const { data: contacts, isLoading, error: contactsError } = useGetContactsQuery();
    const { data: groups, error: groupsError } = useGetGroupsQuery();
    const { filteredContacts, onSubmit } = useFilteredContacts(contacts || [], groups || []);

    const error = contactsError || groupsError;

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = "status" in error ? String(error.status) : "Неизвестная ошибка";
        return <div>Error: {errorMessage}</div>;
    }
    return (
        <Row xxl={1}>
            <Col className="mb-3">
                <FilterForm groupContactsList={groups || []} initialValues={{}} onSubmit={onSubmit} />
            </Col>
            <Col>
                <Row xxl={4} className="g-4">
                    {filteredContacts?.map((contact) => (
                        <Col key={contact.id}>
                            <ContactCard contact={contact} withLink />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};
