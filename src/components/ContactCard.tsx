import { ContactDto } from "src/types/dto/ContactDto";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { favoritesStore } from "src/store/favoritesStore";
import { observer } from "mobx-react-lite";

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = observer<ContactCardProps>(
  ({ contact: { photo, id, name, phone, birthday, address }, withLink }) => {
    const isFavorite = favoritesStore.isFavorite(id);

    return (
      <Card key={id}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <button onClick={() => favoritesStore.toggle(id)}>
            {isFavorite ? "❤️ Удалить" : "🤍 Добавить"}
          </button>
          <Card.Title>
            {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to={`tel:${phone}`} target="_blank">
                  {phone}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
);
