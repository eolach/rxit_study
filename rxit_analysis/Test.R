# install.packages("RPostgreSQL")
require("RPostgreSQL")
library(dplyr)

# create a connection
# save the password that we can "hide" it as best as we can by collapsing it
pw <- {
  "x9cnyzib"
}

# loads the PostgreSQL driver
drv <- dbDriver("PostgreSQL")
# creates a connection to the postgres database
# note that "con" will be used later in each connection to the database
con <- dbConnect(drv, dbname = "rxit_study",
                 host = "localhost", port = 5432,
                 user = "heng", password = pw)
rm(pw) # removes the password

# check for the cartable
dbListTables(con)
# TRUE
prescribers_db <- tbl(con, "rxit_app_prescriber" )
prescribers_db
