import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Pagination,
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdOptions, IoMdClose } from "react-icons/io";
import PopularArticles from "./PopularArticles";
import ArticleCard from "./ArticleCard";
import api from "./api";
import timeAgo from "../../lib/timeAgo";

const Articles = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#01756C",
      },
    },
  });

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let response = null;
        if (text) {
          response = await api.search(5, currentPage, text);
        } else if (tag) {
          response = await api.getArticlesByTag(5, currentPage, tag);
        } else {
          response = await api.getArticles(5, currentPage);
        }

        setArticles(response.articles);
        setTotalDocuments(response.info[0].totalDocuments);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPage, text, tag]);

  useEffect(() => {
    api
      .getTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((error) => console.error(error));
  }, []);

  const paginate = (event) =>
    setCurrentPage(parseInt(event.target.textContent));

  const search = () => {
    setText(document.querySelector("#text").value);
    setTag("");
    setCurrentPage(1);
  };

  const byTag = (event) => {
    setSidebar(false);
    setTag(event.target.id);
    setText("");
    setCurrentPage(1);
  };

  const showAll = (event) => {
    document.querySelector("#text").value = "";
    if (tag.length) setTag("");
    else setText("");
  };

  return !articles.length ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 80px)",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <div className="articlesContainer">
        <div className="articles-content">
          <Paper
            sx={{
              display: tag || text ? "block" : "none",
              lineHeight: 1.625,
              margin: "10px auto",
              padding: "5.280px 0",
              textAlign: "center",
              width: "90%",
            }}
          >
            Showing posts
            {(tag && (
              <span>
                {" "}
                with tag <b>{tag}</b>
              </span>
            )) ||
              (text && (
                <span>
                  {" "}
                  for query <b>{text}</b>
                </span>
              ))}
            .{" "}
            <Link color="primary" onClick={showAll} sx={{ cursor: "pointer" }}>
              Show all posts
            </Link>
            .
          </Paper>
          <div className="articles-content-options">
            {window.innerWidth <= 1080 && (
              <button
                onClick={() => {
                  setSidebar(true);
                }}
              >
                <IoMdOptions style={{ zoom: 2 }} />
              </button>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                search();
              }}
            >
              <label htmlFor="text">
                <RiSearch2Line style={{ zoom: "1.3" }} />
                <input
                  id="text"
                  type="text"
                  placeholder="Search articles here..."
                />
              </label>
            </form>
          </div>

          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                summary={
                  article.summary ??
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur augue id nisi venenatis, ac ultricies magna vulputate. Donec nulla ligula, mattis rhoncus tempor et, eleifend a velit. Ut tempus hendrerit tellus, eget imperdiet an..."
                }
                date={timeAgo.format(Date.parse(article.createdAt))}
                views={`${article.views || "No"} view${
                  article.views > 1 ? "s" : ""
                }`}
                thumbnail={article.thumbnail}
              />
            );
          })}
          {articles.length < totalDocuments && (
            <div className="articles-pages">
              <button
                onClick={() => {
                  setCurrentPage((prev) => {
                    if (prev !== 1) {
                      return prev - 1;
                    } else return prev;
                  });
                }}
              >
                <BsArrowLeft /> Prev
              </button>
              <div className="pages">
                {Array.from({ length: Math.ceil(totalDocuments / 5) }).map(
                  (_, ind) => {
                    return (
                      <span
                        className={`page ${ind + 1 == currentPage && "active"}`}
                        key={ind + 1}
                      >
                        {ind + 1}
                      </span>
                    );
                  }
                )}
              </div>
              <button
                onClick={() => {
                  setCurrentPage((prev) => {
                    if (totalDocuments / 5 < prev) {
                      return prev;
                    } else {
                      return prev + 1;
                    }
                  });
                }}
              >
                Next
                <BsArrowRight />
              </button>
            </div>
          )}
          {/* {articles.length < totalDocuments && (
            <Pagination
              count={Math.ceil(totalDocuments / 6)}
              page={currentPage}
              onChange={paginate}
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            />
          )} */}
        </div>
        {/* Main Section End */}
        <div className={`articles-latest ${sidebar && "active"}`}>
          {window.innerWidth <= 1080 && (
            <div className="articles-latest-title">
              <h2>Search by tag name</h2>
              <button
                onClick={() => {
                  setSidebar(false);
                }}
              >
                <IoMdClose style={{ zoom: 2 }} />
              </button>
            </div>
          )}

          <h3>Popular articles</h3>
          <PopularArticles />

          <h3>Tags</h3>
          <ul className="articles-latest-tags">
            {tags.map((tag) => {
              return (
                <li key={tag._id}>
                  <button id={tag._id} onClick={byTag}>
                    {tag._id} ({tag.count})
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Aside Section Start */}
        {/* <Grid
          item
          xs={12}
          lg={5}
          paddingLeft={isDesktop ? "40px" : 0}
          paddingTop="20px"
        >
          <Card>
            <CardContent
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <TextField
                color="primary"
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width: "65%" }}
                id="text"
              />
              <Button
                onClick={search}
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "primary",
                  marginLeft: 1,
                  width: "35%",
                  ":hover": {
                    bgcolor: "#fff",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Search
              </Button>
            </CardContent>
          </Card>

          <PopularArticles />

          <Card sx={{ marginTop: "40px" }}>
            <CardHeader title="Tags" />
            <Divider />
            <CardContent sx={{ padding: "0!important" }}>
              <List>
                {tags.map((tag) => {
                  return (
                    <ListItem key={tag._id}>
                      <ListItemButton id={tag._id} onClick={byTag}>
                        {tag._id} ({tag.count})
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>*/}
        {/* Aside Section End */}
      </div>
    </ThemeProvider>
  );
};

export default Articles;
