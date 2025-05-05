import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { TbCalendarEvent } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
const ArticleCard = ({ id, title, summary, views, date, thumbnail }) => {
  return (
    <>
      {/* <Card sx={{ padding: "40px 40px 24px", marginBottom: "60px" }}>
        <CardHeader
          sx={{ padding: "10px 0" }}
          title={title}
          titleTypographyProps={{
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1,
          }}
        />

        <Box marginBottom="24px">
          <i className="fa fa-calendar" style={{ color: "#999" }}></i>
          &nbsp;
          <Typography component="span" color="primary" fontSize={16}>
            {date}
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <i className="fa fa-eye" style={{ color: "#999" }}></i>
          &nbsp;
          <Typography component="span" color="primary" fontSize={16}>
            {views}
          </Typography>
        </Box>

        <CardContent sx={{ padding: 0 }}>
          {thumbnail && (
            <CardMedia
              component="img"
              sx={{
                display: "block",
                float: "left",
                maxWidth: 192,
                marginRight: "10px",
                padding: "4px",
              }}
              width={192}
              height={144}
              src={thumbnail}
            />
          )}

          <Box
            color="#666"
            display="inline"
            fontWeight={300}
            lineHeight={1.625}
          >
            {summary}
          </Box>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              marginLeft: "auto",
              ":hover": { color: "#01756C", bgcolor: "#fff" },
            }}
          >
            Read More
          </Button>
        </CardActions>
      </Card> */}
      <Link className="article-card" key={id} href={`/article/${id}`}>
        <img src={thumbnail} alt="article-image" />
        <div className="article-card-content">
          <div className="article-card-st">
            <p>
              <TbCalendarEvent /> {date}
            </p>
            <p>
              <BsBook />
              number of reads: {views.split(" ")[0]}
            </p>
          </div>
          <h2 className="article-card-title">{title}</h2>
          <p className="article-card-text">{summary}...</p>
        </div>
      </Link>
    </>
  );
};

export default ArticleCard;
