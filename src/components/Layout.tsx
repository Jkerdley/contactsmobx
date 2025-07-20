import { Outlet, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { MainMenu } from "./MainMenu";
import { Breadcrumbs } from "src/components/Breadcrumbs";
import { useEffect } from "react";
import { contactsStore } from "src/store/contactsStore";
import { groupsStore } from "src/store/groupsStore";

export const Layout = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    contactsStore.fetch();
    groupsStore.fetch();
  }, []);

  return (
    <Container>
      <Row>
        <Col xxl={12}>
          <MainMenu />
        </Col>
        <Col xxl={12}>
          <Breadcrumbs pathNames={pathNames} />
        </Col>
        <Col xxl={12}>
          <Outlet />
        </Col>
        <Col xxl={12}>
          <footer></footer>
        </Col>
      </Row>
    </Container>
  );
};
