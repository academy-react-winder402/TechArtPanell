// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";

// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

const BlogEdit = () => {
  const initialContent = `
  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
  <p>کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.</p>
  `;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [status, setStatus] = useState(""),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg");

  useEffect(() => {
    // داده‌های فیک به جای فراخوانی API
    const fakeData = {
      blogTitle: "ویرایش وبلاگ",
      slug: "blog-edit",
      blogCategories: [
        { value: "fashion", label: "Fashion" },
        { value: "gaming", label: "Gaming" },
      ],
      featuredImage: "https://via.placeholder.com/800x400",
      status: "Published",
      avatar: "https://via.placeholder.com/150",
      userFullName: "جان دو",
      createdTime: "24 مارس 2023",
    };
    setData(fakeData);
    setTitle(fakeData.blogTitle);
    setSlug(fakeData.slug);
    setBlogCategories(fakeData.blogCategories);
    setFeaturedImg(fakeData.featuredImage);
    setStatus(fakeData.status);
  }, []);

  const categories = [
    { value: "fashion", label: "Fashion" },
    { value: "gaming", label: "Gaming" },
    { value: "quote", label: "Quote" },
    { value: "video", label: "Video" },
    { value: "food", label: "Food" },
  ];

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function () {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="ویرایش وبلاگ"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "ویرایش" }]}
      />
      {data !== null ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div>
                    <Avatar
                      className="me-75"
                      img={data.avatar}
                      imgWidth="38"
                      imgHeight="38"
                    />
                  </div>
                  <div>
                    <h6 className="mb-25">{data.userFullName}</h6>
                    <CardText>{data.createdTime}</CardText>
                  </div>
                </div>
                <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                  <Row>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-title">
                        عنوان
                      </Label>
                      <Input
                        id="blog-edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-category">
                        دسته‌بندی
                      </Label>
                      <Select
                        id="blog-edit-category"
                        isClearable={false}
                        theme={selectThemeColors}
                        value={blogCategories}
                        isMulti
                        name="colors"
                        options={categories}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(data) => setBlogCategories(data)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-slug">
                        اسلاگ
                      </Label>
                      <Input
                        id="blog-edit-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-status">
                        وضعیت
                      </Label>
                      <Input
                        type="select"
                        id="blog-edit-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Published">منتشر شده</option>
                        <option value="Pending">در انتظار</option>
                        <option value="Draft">پیش نویس</option>
                      </Input>
                    </Col>
                    <Col sm="12" className="mb-2">
                      <Label className="form-label">محتوا</Label>
                      <Editor
                        editorState={content}
                        onEditorStateChange={(data) => setContent(data)}
                      />
                    </Col>
                    <Col className="mb-2" sm="12">
                      <div className="border rounded p-2">
                        <h4 className="mb-1">تصویر شاخص</h4>
                        <div className="d-flex flex-column flex-md-row">
                          <img
                            className="rounded me-2 mb-1 mb-md-0"
                            src={featuredImg}
                            alt="featured img"
                            width="170"
                            height="110"
                          />
                          <div>
                            <small className="text-muted">
                              وضوح تصویر مورد نیاز 800x400، اندازه تصویر 10
                              مگابایت.
                            </small>

                            <p className="my-50">
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p>
                            <div className="d-inline-block">
                              <div className="mb-0">
                                <Input
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="customFile"
                                  onChange={onChange}
                                  accept=".jpg, .png, .gif"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-50">
                      <Button color="primary" className="me-1">
                        ذخیره تغییرات
                      </Button>
                      <Button color="secondary" outline>
                        لغو
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default BlogEdit;
