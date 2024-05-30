// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import classnames from "classnames";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
} from "react-feather";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-6.jpg";

const BlogDetails = () => {
  // ** States
  const [data, setData] = useState(null);

  useEffect(() => {
    // داده‌های فیک به جای فراخوانی API
    const fakeData = {
      blog: {
        title: "درک هوک‌های ری‌اکت",
        img: "https://via.placeholder.com/800x400",
        avatar: "https://via.placeholder.com/150",
        userFullName: "جان دو",
        createdTime: "24 مارس 2023",
        tags: ["نقل قول", "مد", "بازی"],
        content:
          "<p>این محتوای وبلاگ است. در مورد هوک‌های ری‌اکت صحبت می‌کند...</p>",
        comments: 42,
        bookmarked: 120,
      },
      comments: [
        {
          userFullName: "جین اسمیت",
          commentedAt: "1 آوریل 2023",
          commentText: "مقاله عالی بود!",
          avatar: "https://via.placeholder.com/150",
        },
        {
          userFullName: "مایک جانسون",
          commentedAt: "2 آوریل 2023",
          commentText: "بسیار آموزنده، ممنون!",
          avatar: "https://via.placeholder.com/150",
        },
      ],
    };
    setData(fakeData);
  }, []);

  const badgeColorsArr = {
    "نقل قول": "light-info",
    مد: "light-primary",
    بازی: "light-danger",
    ویدئو: "light-warning",
    غذا: "light-success",
  };

  const renderTags = () => {
    return data.blog.tags.map((tag, index) => {
      return (
        <a key={index} href="/" onClick={(e) => e.preventDefault()}>
          <Badge
            className={classnames({
              "me-50": index !== data.blog.tags.length - 1,
            })}
            color={badgeColorsArr[tag]}
            pill
          >
            {tag}
          </Badge>
        </a>
      );
    });
  };

  const renderComments = () => {
    return data.comments.map((comment) => {
      return (
        <Card className="mb-3" key={comment.userFullName}>
          <CardBody>
            <div className="d-flex">
              <div>
                <Avatar
                  className="me-75"
                  img={comment.avatar}
                  imgHeight="38"
                  imgWidth="38"
                />
              </div>
              <div>
                <h6 className="fw-bolder mb-25">{comment.userFullName}</h6>
                <CardText>{comment.commentedAt}</CardText>
                <CardText>{comment.commentText}</CardText>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <div className="d-inline-flex align-items-center">
                    <CornerUpLeft size={18} className="me-50" />
                    <span>پاسخ</span>
                  </div>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="جزئیات وبلاگ"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "جزئیات" }]}
      />
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg src={data.blog.img} className="img-fluid" top />
                    <CardBody>
                      <CardTitle tag="h4">{data.blog.title}</CardTitle>
                      <div className="d-flex">
                        <Avatar
                          className="me-50"
                          img={data.blog.avatar}
                          imgHeight="24"
                          imgWidth="24"
                        />
                        <div>
                          <small className="text-muted me-25">توسط</small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {data.blog.userFullName}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">
                            {data.blog.createdTime}
                          </small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{renderTags()}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.blog.content,
                        }}
                      ></div>
                      <div className="d-flex">
                        <div>
                          <Avatar
                            img={cmtImg}
                            className="me-2"
                            imgHeight="60"
                            imgWidth="60"
                          />
                        </div>
                        <div>
                          <h6 className="fw-bolder">ویلی کلارک</h6>
                          <CardText className="mb-0">
                            مستقر در لندن، Uncode یک وبلاگ توسط ویلی کلارک است.
                            پست‌های او روندهای مدرن طراحی را از طریق عکس‌ها و
                            نقل قول‌های طراحان وب و خلاقان برجسته از سراسر جهان
                            بررسی می‌کند.
                          </CardText>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center me-1">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <MessageSquare
                                size={21}
                                className="text-body align-middle"
                              />
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {kFormatter(data.blog.comments)}
                              </div>
                            </a>
                          </div>
                          <div className="d-flex align-items-cente">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Bookmark
                                size={21}
                                className="text-body align-middle"
                              />
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {data.blog.bookmarked}
                              </div>
                            </a>
                          </div>
                        </div>
                        <UncontrolledDropdown className="dropdown-icon-wrapper">
                          <DropdownToggle tag="span">
                            <Share2
                              size={21}
                              className="text-body cursor-pointer"
                            />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className="py-50 px-1">
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Linkedin size={18} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12" id="blogComment">
                  <h6 className="section-label">نظرات</h6>
                  {renderComments()}
                </Col>
                <Col sm="12">
                  <h6 className="section-label">ارسال نظر</h6>
                  <Card>
                    <CardBody>
                      <Form
                        className="form"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <Row>
                          <Col sm="6">
                            <div className="mb-2">
                              <Input placeholder="نام" />
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="mb-2">
                              <Input type="email" placeholder="ایمیل" />
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="mb-2">
                              <Input type="url" placeholder="وب‌سایت" />
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="mb-2">
                              <Input
                                className="mb-2"
                                type="textarea"
                                rows="4"
                                placeholder="نظر"
                              />
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="form-check mb-2">
                              <Input type="checkbox" id="save-data-checkbox" />
                              <Label
                                className="form-check-label"
                                for="save-data-checkbox"
                              >
                                نام، ایمیل و وب‌سایت من را در این مرورگر ذخیره
                                کن تا در نظرات بعدی استفاده شود.
                              </Label>
                            </div>
                          </Col>
                          <Col sm="12">
                            <Button color="primary">ارسال نظر</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;
