import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Alert } from "reactstrap";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-users.scss";
import UserTabs from "./Tab";

const fakeUser = {
  id: 1,
  invoiceId: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  plan: "Premium",
};

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // جایگزین کردن با فراخوانی API واقعی
    if (parseInt(id) === fakeUser.id) {
      setUser(fakeUser);
    }
  }, [id]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return user ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={user} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر پیدا نشد</h4>
      <div className="alert-body">
        کاربری با شناسه: {id} وجود ندارد. لیست همه کاربران را بررسی کنید:{" "}
        <Link to="/apps/user/list">لیست کاربران</Link>
      </div>
    </Alert>
  );
};

export default UserView;
