var documenterSearchIndex = {"docs":
[{"location":"#ODBC.jl","page":"Home","title":"ODBC.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Depth = 3","category":"page"},{"location":"","page":"Home","title":"Home","text":"The ODBC.jl package provides a Julia interface for the ODBC API as implemented by various ODBC driver managers. More specifically, it provides a prebuilt copy of iODBC and unixODBC for OSX/Linux platforms, while still relying on the system-provided libraries on Windows. This means that no extra installation of a driver manager is necessary after installing the ODBC.jl package like:","category":"page"},{"location":"","page":"Home","title":"Home","text":"] add ODBC","category":"page"},{"location":"","page":"Home","title":"Home","text":"Another common source of headache with ODBC is the various locations of configuration files on OSX/Linux; to remedy this, ODBC.jl writes and loads its own odbc.ini and odbcinst.ini configuration files in a \"scratch space\", as provided by the Scratch.jl package. This ensures ODBC enviornment variables like ODBCINI are correctly set to the ODBC.jl managed config files. Additionally, ODBC.jl provides convenient ODBC administrative functions to add/remove drivers and dsns (see ODBC.addriver and ODBC.adddsn).","category":"page"},{"location":"","page":"Home","title":"Home","text":"What this all means is that hopefully ODBC.jl provides the easiest setup experience possible for a slightly dated API that is known for configuration complexities.","category":"page"},{"location":"#Getting-Started","page":"Home","title":"Getting Started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Once ODBC.jl is installed, you'll want, at a minimum, to configure ODBC drivers for the specific databases you'll be connecting to. A reminder on ODBC architecture that each database must build/distribute their own compliant ODBC driver that can talk with the ODBC.jl-provided driver manager to make connections, execute queries, etc. What's more, individual database drivers must often build against a specific driver manager (or specific driver manager per platform). By default, ODBC.jl will use iODBC as driver manager on OSX, unixODBC on Linux platforms, and the system-provided driver manager on Windows. If a database driver mentions a requirement for a specific driver manager, ODBC.jl provides a way to switch between them, even at run-time (see ODBC.setiODBC and ODBC.setunixODBC).","category":"page"},{"location":"","page":"Home","title":"Home","text":"To install an ODBC driver, you can call:","category":"page"},{"location":"","page":"Home","title":"Home","text":"ODBC.adddriver(\"name of driver\", \"full, absolute path to driver shared library\"; kw...)","category":"page"},{"location":"","page":"Home","title":"Home","text":"passing the name of the driver, the full, absolute path to the driver shared library, and any additional keyword arguments which will be included as KEY=VALUE pairs in the .ini config files. ***NOTE*** on Windows, you likely need to start Julia (or your terminal) with administrative privileges (like ctrl + right-click the application, then choose open as admin) in order to add drivers via ODBC like this.","category":"page"},{"location":"#Connections","page":"Home","title":"Connections","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Once a driver or two are installed (viewable by calling ODBC.drivers()), you can either:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Setup a DSN, via ODBC.adddsn(\"dsn name\", \"driver name\"; kw...)\nMake a connection directly by using a full connection string like ODBC.Connection(connection_string)","category":"page"},{"location":"","page":"Home","title":"Home","text":"In setting up a DSN, you can specify all the configuration options once, then connect by just calling ODBC.Connection(\"dsn name\") or DBInterface.execute(ODBC.Connection, \"dsn name\"), optionally passing a username and password as the 2nd and 3rd arguments. Alternatively, crafting and connecting via a fully specified connection string can mean less config-file dependency.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that connecting will use the currently \"set\" ODBC driver manager, which by default is iODBC on OSX, unixODBC on Linux, and the system driver manager on Windows. If you experience cryptic connection errors, it's probably worth checking with your ODBC driver documentation to see if it requires a specific driver manager. For example, Microsoft-provided ODBC driver for SQL Server requires unixODBC on OSX, but by default, ODBC.jl sets the driver manager to iODBC, so before connecting, you would need to do:","category":"page"},{"location":"","page":"Home","title":"Home","text":"ODBC.setunixODBC()\nconn = ODBC.Connection(...)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that the odbc driver shared libraries can be \"sticky\" with regards to changing to system configuration files. You may need to set a OVERRIDE_ODBCJL_CONFIG environment variable before starting julia and running import ODBC to ensure that no environment variables are changed by ODBC.jl itself. You can do this like:","category":"page"},{"location":"","page":"Home","title":"Home","text":"ENV[\"OVERRIDE_ODBCJL_CONFIG\"] = true\nusing ODBC\nODBC.setunixODBC(;ODBCSYSINI=\"/etc\", ODBCINSTINI=\"odbcinst.ini\", ODBCINI=\"/etc/odbc.ini\")\nconn = ODBC.Connection(...)","category":"page"},{"location":"#Executing-Queries","page":"Home","title":"Executing Queries","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To execute queries, there are two paths:","category":"page"},{"location":"","page":"Home","title":"Home","text":"DBInterface.execute(conn, sql, params): directly execute a SQL query and return a Cursor for any resultset\nstmt = DBInterface.prepare(conn, sql); DBInterface.execute(stmt, params): first prepare a SQL statement, then execute, perhaps multiple times with different parameters","category":"page"},{"location":"","page":"Home","title":"Home","text":"Both forms of DBInterface.execute return a Cursor object that satisfies the Tables.jl, so results can be utilized in whichever way is most convenient, like DataFrame(x), CSV.write(\"results.csv\", x) or materialzed as a plain Matrix (Tables.matrix(x)), NamedTuple (Tables.columntable(x)), or Vector of NamedTuple (Tables.rowtable(x)).","category":"page"},{"location":"","page":"Home","title":"Home","text":"An example of executing query is:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using DataFrames\ndf = DBInterface.execute(conn, \"SELECT id, wage FROM employees\") |> DataFrame\n# if wage is a DecFP, maybe I want to convert to Float64 or Int64\n# convert to Float64\ndf.wage = Float64.(df.wage)\n# convert to Int64\ndf.wage = Int.(df.wage)","category":"page"},{"location":"#Loading-data","page":"Home","title":"Loading data","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ODBC.jl attempts to provide a convenient ODBC.load(table, conn, table_name) function for generically loading Tables.jl-compatible sources into database tables. While the ODBC spec has some utilities for even making this possible, just note that it can be tricky to do generically in practice due to differences in database requirements for CREATE TABLE and column type statements.","category":"page"},{"location":"#Troubleshooting","page":"Home","title":"Troubleshooting","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Using ODBC is notoriously complex on any system/language, so here's a collection of ideas/cases that have tripped people up in the past.","category":"page"},{"location":"#Connection-issues","page":"Home","title":"Connection issues","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you're having connection issues, try to look up the documented requirements for the specific ODBC driver you're using; in particular, try to see if a specific driver manager is required, like iODBC or unixODBC. One example is in the Microsoft-provided SQL Server ODBC driver for mac/OSX which requires unixODBC as opposed to the usual OSX default iODBC. In ODBC.jl, you can easily switch between the two by just doing ODBC.setunixODBC() or ODBC.setiODBC().","category":"page"},{"location":"#Query-mangling/unicode-issues","page":"Home","title":"Query mangling/unicode issues","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Unicode support in ODBC is notoriously messy; different driver managers supports different things manually vs. automatically, drivers might require specific encodings or be flexible for all. ODBC.jl tries to stick with the most generally accepted defaults which is using the UTF-16 encoding in unixODBC and Windows, and using UTF-32 for OSX with iODBC. Sometimes, specific drivers will have configurations or allow datasource connection parameters to alter these. We don't recommend changing to anything but the defaults, but sometimes there are defaults shipped with drivers that don't match ODBC.jl's defaults. One example is the Impala ODBC driver on linux, which is correctly built against unixODBC (default driver manager on linux), but then sets a property DriverManagerEncoding=UTF-32 in the /opt/cloudera/impalaodbc/lib/64/cloudera.impalaodbc.ini file which messes things up (since ODBC.jl tries to use UTF-16). This examples shows that there may be driver-provided configuration files that make affect things that sometimes take some digging to figure out. Always try to read through the driver documentation and keep an eye out for these kinds of settings, and then don't be afraid to snoop around in the installed files to see if anything seems out of place.","category":"page"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These are concrete examples provided by the community to demonstrate the steps to set up a connection and run a basic query from julia.","category":"page"},{"location":"#Connect-to-a-Trino-Cluster-(formerly-PrestoDB)-from-Local-macOS","page":"Home","title":"Connect to a Trino Cluster (formerly PrestoDB) from Local macOS","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Steps:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Find, download, install machine specific ODBC driver.\nGather DB connection parameters from your DB service, including credentials.\nProvide local driver path to julia process.\nConfigure the connection string.\nCreate a connection and send a query.","category":"page"},{"location":"#Download-and-Install-ODBC-Driver","page":"Home","title":"Download and Install ODBC Driver","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You need a driver to connect to a database.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Trino provides a JDBC driver and CLI which require an installed JVM. There is also a trino python client, and there is a 3P ODBC available for purchase from Insight Software.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Fortunately Starburst provides a free ODBC driver, we'll use that one. Starburst ODBC driver installation instructions and links to driver documentation are on the Starburst website.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For local development on macOS, download the machine specific driver from the Starburst link above. I'm using \"Starburst ODBC Apple Silicon .dmg\". Note the architecture, Intel vs. Apple Silicon. Also note the supported versions, I had to upgrade to macOS 10.13 to use this driver.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now install the driver from the downloaded .dmg via the usual double-click package, etc. Installed location is referenced in the driver docs, see driverpath below.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The Starburst trino driver includes the driver manager (yes an ODBC driver needs an ODBC driver manager), so no need for: brew install unixodbc or libiodbc.","category":"page"},{"location":"#Setup-Connection-String,-Connect,-Query","page":"Home","title":"Setup Connection String, Connect, Query","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"I'm storing the DB credentials in environment variables TRINO_USER and TRINO_PASSWORD.\ndrivername is any name you provide, the ODBC connection will reference this name.\nI'm using a connection string instead of DNS configuration files (see driver documentation).\nThe driver documentation provides the connection string specification.\nNote that \"LDAP Authentication\" enables SSL by default, which for my trino server is a requirement to connect to the Trino DB.","category":"page"},{"location":"","page":"Home","title":"Home","text":"# CONFIGURATION\nusing ODBC\nusing DataFrames\n\nhost = \"trino-adhoc.my-company.net\"\nport = \"443\"\nTRINO_CREDS = Dict(\"user\" => ENV[\"TRINO_USER\"], \"password\"=> ENV[\"TRINO_PASSWORD\"])\ndrivername = \"trino\"\ndriverpath = \"/Library/starburst/starburstodbc/lib/libstarburstodbc_sb64-universal.dylib\"\nconnection_string = \"Driver=$(drivername);Host=$(host);Port=$(port);AuthenticationType=LDAP Authentication\"\n\n\n# CONNECT AND SEND A QUERY\n\n# this only needs to be done once per julia project\nODBC.adddriver(drivername, driverpath)\nODBC.drivers()\n    # Dict{String, String} with 1 entry:\n    # \"trino\" => \"Installed\"\n\nconn = ODBC.Connection(connection_string, TRINO_CREDS[\"user\"], TRINO_CREDS[\"password\"])\n\ndf = DBInterface.execute(conn, \"show catalogs;\") |> DataFrame;\ndf = DBInterface.execute(conn, \"select current_date as today;\") |> DataFrame\n    # 1×1 DataFrame\n    #  Row │ today\n    #      │ Date\n    # ─────┼────────────\n    #    1 │ 2023-02-11","category":"page"},{"location":"#API-Reference","page":"Home","title":"API Reference","text":"","category":"section"},{"location":"#DBMS-Connections","page":"Home","title":"DBMS Connections","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DBInterface.connect\nODBC.Connection\nDBInterface.close!","category":"page"},{"location":"#DBInterface.connect","page":"Home","title":"DBInterface.connect","text":"DBInterface.connect(ODBC.Connection, dsn_or_connectionstring; user, password, extraauth, connectionstring::Bool=false)\n\nConstruct a Connection type by connecting to a valid ODBC Connection or by specifying a datasource name or valid connection string. 1st argument dsn can be either the name of a pre-defined ODBC Connection or a valid connection string. A great resource for building valid connection strings is http://www.connectionstrings.com/. Takes optional keyword arguments username, password, and extraauth, which are used to specify auth parameters. extraauth is to allow you to pass a sensitive string to be appended verbatim to the end of the connection string, e.g. DB-specific auth token parameters.\n\nNote that connecting will use the currently \"set\" ODBC driver manager, which by default is iODBC on OSX, unixODBC on Linux, and the system driver manager on Windows. If you experience cryptic connection errors, it's probably worth checking with your ODBC driver documentation to see if it requires a specific driver manager. For example, Microsoft-provided ODBC driver for SQL Server requires unixODBC on OSX, but by default, ODBC.jl sets the driver manager to iODBC, so before connecting, you would need to do:\n\nODBC.setunixODBC()\nconn = ODBC.Connection(...)\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.Connection","page":"Home","title":"ODBC.Connection","text":"ODBC.Connection(dsn_or_connectionstring; user, password, extraauth)\n\nConstruct a Connection type by connecting to a valid ODBC Connection or by specifying a datasource name or valid connection string. 1st argument dsn can be either the name of a pre-defined ODBC Connection or a valid connection string. A great resource for building valid connection strings is http://www.connectionstrings.com/. Takes optional keyword arguments username, password, and extraauth, which are used to specify auth parameters. extraauth is to allow you to pass a sensitive string to be appended verbatim to the end of the connection string, e.g. DB-specific auth token parameters.\n\nNote that connecting will use the currently \"set\" ODBC driver manager, which by default is iODBC on OSX, unixODBC on Linux, and the system driver manager on Windows. If you experience cryptic connection errors, it's probably worth checking with your ODBC driver documentation to see if it requires a specific driver manager. For example, Microsoft-provided ODBC driver for SQL Server requires unixODBC on OSX, but by default, ODBC.jl sets the driver manager to iODBC, so before connecting, you would need to do:\n\nODBC.setunixODBC()\nconn = ODBC.Connection(...)\n\n\n\n\n\n","category":"type"},{"location":"#DBInterface.close!","page":"Home","title":"DBInterface.close!","text":"DBInterface.close!(conn)\n\nClose an open connection. In general, statements and open cursors will not be valid once a connection has been closed.\n\n\n\n\n\nDBInterface.close!(stmt)\n\nClose a prepared statement. Further parameter binding or execution will not be valid.\n\n\n\n\n\n","category":"function"},{"location":"#Query-execution-and-result-handling","page":"Home","title":"Query execution and result handling","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DBInterface.prepare\nDBInterface.execute\nDBInterface.executemultiple","category":"page"},{"location":"#DBInterface.prepare","page":"Home","title":"DBInterface.prepare","text":"DBInterface.prepare(conn, sql) -> ODBC.Statement\n\nPrepare a query string, optionally including parameters to bind upon execution (with ? markers). Please refer to individual dbms documentation for the exact level of parameter binding support.\n\nThe returned prepared statement can then be passed to DBInterface.execute(stmt, params) with params that will be bound before execution. This allows preparing the statement once, and re-using it many times with different parameters (or the same) efficiently.\n\n\n\n\n\n","category":"function"},{"location":"#DBInterface.execute","page":"Home","title":"DBInterface.execute","text":"DBInterface.execute(stmt, params=(); iterate_rows::Bool=false, ignore_driver_row_count::Bool=false, normalizenames::Bool=false, debug::Bool=false) -> ODBC.Cursor\n\nExecute a prepare statement, binding any parameters beforehand. Returns a Cursor object, even if the statement is not resultset-producing (cursor will have zero rows and/or columns). The Cursor object satisfies the Tables.jl interface as a source, so any valid sink can be used for inspecting results (a list of integrations is maintained here).\n\nSupported keyword arguments include:\n\niterate_rows::Bool: for forcing row iteration of the resultset\nignore_driver_row_count::Bool: for ignoring the row count returned from the database driver; in some cases (Netezza), the driver may return an incorrect or \"prefetched\" number for the row count instead of the actual row count; this allows ignoring those numbers and fetching the resultset until truly exhausted\nnormalizenames::Bool: normalize column names to valid Julia identifiers; this can be convenient when working with the results in, for example, a DataFrame where you can access columns like df.col1\ndebug::Bool: for printing additional debug information during the query/result process.\n\n\n\n\n\nDBInterface.execute(conn, sql, params=(); iterate_rows::Bool=false, ignore_driver_row_count::Bool=false, normalizenames::Bool=false, debug::Bool=false) -> ODBC.Cursor\n\nSend a query directly to connection for execution. Returns a Cursor object, even if the statement is not resultset-producing (cursor will have zero rows and/or columns). The Cursor object satisfies the Tables.jl interface as a source, so any valid sink can be used for inspecting results (a list of integrations is maintained here).\n\nSupported keyword arguments include:\n\niterate_rows::Bool: for forcing row iteration of the resultset\nignore_driver_row_count::Bool: for ignoring the row count returned from the database driver; in some cases (Netezza), the driver may return an incorrect or \"prefetched\" number for the row count instead of the actual row count; this allows ignoring those numbers and fetching the resultset until truly exhausted\nnormalizenames::Bool: normalize column names to valid Julia identifiers; this can be convenient when working with the results in, for example, a DataFrame where you can access columns like df.col1\ndebug::Bool: for printing additional debug information during the query/result process.\n\nThis is an alternative execution path to DBInterface.execute with a prepared statement. This method is faster/less overhead for one-time executions, but prepared statements will have more benefit for repeated executions (even with different parameters).\n\n\n\n\n\n","category":"function"},{"location":"#Data-loading","page":"Home","title":"Data loading","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ODBC.load","category":"page"},{"location":"#ODBC.load","page":"Home","title":"ODBC.load","text":"ODBC.load(table, conn, name; append=true, quoteidentifiers=true, limit=typemax(Int64), createtableclause=nothing, columnsuffix=Dict(), debug=false)\ntable |> ODBC.load(conn, name; append=true, quoteidentifiers=true, limit=typemax(Int64), createtableclause=nothing, columnsuffix=Dict(), debug=false)\n\nAttempts to take a Tables.jl source table and load into the database represented by conn with table name name.\n\nIt first detects the Tables.Schema of the table source and generates a CREATE TABLE statement with the appropriate column names and types. If no table name is provided, one will be autogenerated, like odbcjl_xxxxx. The CREATE TABLE clause can be provided manually by passing the createtableclause keyword argument, which would allow specifying a temporary table or if not exists. Column definitions can also be enhanced by providing arguments to columnsuffix as a Dict of  column name (given as a Symbol) to a string of the enhancement that will come after name and type like [column name] [column type] enhancements. This allows, for example, specifying the charset of a string column by doing something like columnsuffix=Dict(:Name => \"CHARACTER SET utf8mb4\").\n\nDo note that databases vary wildly in requirements for CREATE TABLE and column definitions so it can be extremely difficult to load data generically. You may just need to tweak some of the provided keyword arguments, but you may also need to execute the CREATE TABLE and INSERT statements yourself. If you run into issues, you can open an issue and we can see if there's something we can do to make it easier to use this function.\n\n\n\n\n\n","category":"function"},{"location":"#Catalog-functions","page":"Home","title":"Catalog functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ODBC.tables\nODBC.columns","category":"page"},{"location":"#ODBC.tables","page":"Home","title":"ODBC.tables","text":"tables(conn; catalogname=nothing, schemaname=nothing, tablename=nothing, tabletype=nothing) -> ODBC.Cursor\n\nFind tables by the given criteria.  This function returns a Cursor object that produces one row per matching table.\n\nSearch criteria include:\n\ncatalogname: search pattern for catalog names\nschemaname: search pattern for schema names\ntablename: search pattern for table names\ntabletypes: comma-separated list of table types\n\nA search pattern may contain an underscore (_) to represent any single character and a percent sign (%) to represent any sequence of zero or more characters. Use an escape character (driver-specific, but usually \\) to include underscores, percent signs, and escape characters as literals.\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.columns","page":"Home","title":"ODBC.columns","text":"columns(conn; catalogname=nothing, schemaname=nothing, tablename=nothing, columnname=nothing) -> ODBC.Cursor\n\nFind columns by the given criteria.  This function returns a Cursor object that produces one row per matching column.\n\nSearch criteria include:\n\ncatalogname: name of the catalog\nschemaname: search pattern for schema names\ntablename: search pattern for table names\ncolumnname: search pattern for column names\n\nA search pattern may contain an underscore (_) to represent any single character and a percent sign (%) to represent any sequence of zero or more characters. Use an escape character (driver-specific, but usually \\) to include underscores, percent signs, and escape characters as literals.\n\n\n\n\n\n","category":"function"},{"location":"#ODBC-administrative-functions","page":"Home","title":"ODBC administrative functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ODBC.drivers\nODBC.dsns\nODBC.adddriver\nODBC.removedriver\nODBC.adddsn\nODBC.removedsn\nODBC.setdebug","category":"page"},{"location":"#ODBC.drivers","page":"Home","title":"ODBC.drivers","text":"ODBC.drivers() -> Dict\n\nList installed ODBC drivers. The primary config location for installed drivers on non-windows platforms is a reserved \"scratch\" space directory, i.e. an ODBC.jl-managed location. Other system/user locations may also be checked (and are used by default on windows) by the underlying ODBC driver manager, but for the most consistent results, aim to allow ODBC.jl to manage installed drivers/datasources via ODBC.addriver, ODBC.removedriver, etc.\n\nNote that the odbc driver shared libraries can be \"sticky\" with regards to changing to system configuration files. You may need to set a OVERRIDE_ODBCJL_CONFIG environment variable before starting julia and running import ODBC to ensure that no environment variables are changed by ODBC.jl itself.\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removedriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.dsns","page":"Home","title":"ODBC.dsns","text":"ODBC.dsns() -> Dict\n\nList installed ODBC datasources. The primary config location for installed datasources on non-windows platforms is a reserved \"scratch\" space directory, i.e. an ODBC.jl-managed location. Other system/user locations may also be checked (and are by default on windows) by the underlying ODBC driver manager, but for the most consistent results, aim to allow ODBC.jl to manage installed drivers/datasources via ODBC.adddsn, ODBC.removedsn, etc.\n\nNote that the odbc driver shared libraries can be \"sticky\" with regards to changing to system configuration files. You may need to set a OVERRIDE_ODBCJL_CONFIG environment variable before starting julia and running import ODBC to ensure that no environment variables are changed by ODBC.jl itself.\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removdriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.adddriver","page":"Home","title":"ODBC.adddriver","text":"ODBC.adddriver(name, libpath; kw...)\n\nInstall a new ODBC driver. name is a user-provided \"friendly\" name to identify the driver. libpath is the absolute path to the ODBC driver shared library. Other key-value driver properties can be provided by the kw... keyword arguments.\n\nThis method is provided to try and provide the simplest/easiest/most consistent setup experience for installing a new driver. Editing configuration files by hand is error-prone and it's easy to miss adding something that is required.\n\nWhile ODBC.jl supports all 3 major ODBC driver managers (unixODBC, iODBC, and odbc32), be aware that most DBMS ODBC driver libraries are built against only one of the 3 and can lead to compatibility issues if a different driver manager is used. This is mainly an issue for driver libraries built against iODBC and then tried to use with unixODBC or vice-versa.\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removdriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.removedriver","page":"Home","title":"ODBC.removedriver","text":"ODBC.removedriver(name; removedsns::Bool=true)\n\nRemove an installed ODBC driver by name (as returned from ODBC.drivers()). removedsns=true also removes any datasources that were specified to use the driver.\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removdriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.adddsn","page":"Home","title":"ODBC.adddsn","text":"ODBC.adddsn(name, driver; kw...)\n\nInstall a new ODBC datasource. name is a user-provided \"friendly\" name to identify the datasource (dsn). driver is the \"friendly\" driver name that should be used to connect to the datasource (valid driver options can be seen from ODBC.drivers()). Additional connection key-value properties can be provided by the kw... keyword arguments.\n\nDatasources can be connected by calling DBInterface.connect(ODBC.Connection, dsn, user, pwd), where dsn is the friendly datasource name, user is the username, and pwd is the password.\n\nAn alternative approach to installing datasources is to generate a valid \"connection string\" that includes all connection properties in a single string passed to DBInterface.connect. www.connectionstrings.com is a convenient resource that provides connection string templates for various database systems.\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removdriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.removedsn","page":"Home","title":"ODBC.removedsn","text":"ODBC.removedsn(name)\n\nRemove an installed datasource by name (as returned from ODBC.dsns()).\n\nOn windows, ODBC.jl uses the system-wide configurations for drivers and datasources. Drivers and datasources can still be added via ODBC.adddriver/ODBC.removdriver and ODBC.adddsn/ODBC.removedsn, but you must have administrator privileges in the Julia session. This is accomplished easiest by pressing CTRL then right-clicking on the terminal/Julia application and choosing \"Run as administrator\".\n\n\n\n\n\n","category":"function"},{"location":"#ODBC.setdebug","page":"Home","title":"ODBC.setdebug","text":"ODBC.setdebug(debug::Bool=true, tracefile::String=joinpath(tempdir(), \"odbc.log\"))\n\nTurn on ODBC library call tracing. This prints debug information to tracefile upon every entry and exit from calls to the underlying ODBC library (unixODBC, iODBC, or odbc32). Debugging can be turned off by passing false.\n\nNote that setting tracing on/off requires resetting the ODBC environment, which means any open statements/connections will be closed/invalid.\n\nAlso note that due to the persistent nature of ODBC config, setting tracing will persist acrosss Julia sessions, i.e. if you turn tracing on, then quit julia and start again tracing will still be on, and will stay on until explicitly turned off.\n\nThe iODBC driver manager supports passing stderr as the tracefile, which will print all tracing information into the julia session/repl.\n\n\n\n\n\n","category":"function"}]
}
