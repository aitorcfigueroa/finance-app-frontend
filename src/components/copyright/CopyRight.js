import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" { ...props }>
      { 'Copyright © ' }
      <Link color='inherit' href="https://github.com/dekkvar">
        Aitor Couñago Figueroa's GitHub
      </Link>
      { ' ' + new Date().getFullYear() + '.' }
    </Typography>
  )
}