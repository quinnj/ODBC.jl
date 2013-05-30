#Translation of sqltypes.h; C typealiases for SQL functions
typealias SQLCHAR Cuchar	
typealias SQLSCHAR Cchar		
typealias SQLDATE Cuchar	
typealias SQLDECIMAL Cuchar	
typealias SQLDOUBLE Cdouble	
typealias SQLFLOAT Cdouble	
typealias SQLINTEGER Cint
typealias SQLUINTEGER Cuint
typealias SQLSMALLINT Cshort
typealias SQLUSMALLINT Cushort
if OS_NAME == :Windows && WORD_SIZE == 64
	typealias SQLLEN Int64
	typealias SQLULEN Uint64
	typealias SQLSETPOSIROW Uint64
else
	typealias SQLLEN SQLINTEGER
	typealias SQLULEN SQLUINTEGER
	typealias SQLSETPOSIROW SQLUSMALLINT
end
typealias SQLROWCOUNT SQLULEN
typealias SQLROWSETSIZE SQLULEN
typealias SQLTRANSID SQLULEN
typealias SQLROWOFFSET SQLLEN
typealias SQLNUMERIC Cuchar
typealias SQLPOINTER Ptr{Void}
typealias SQLREAL Cfloat
typealias SQLTIME Cuchar
typealias SQLTIMESTAMP Cuchar
typealias SQLVARCHAR Cuchar
typealias SQLRETURN SQLSMALLINT
typealias SQLHANDLE Ptr{Void}
typealias SQLHENV SQLHANDLE
typealias SQLHDBC SQLHANDLE
typealias SQLHSTMT SQLHANDLE
typealias SQLHDESC SQLHANDLE
typealias ULONG Cuint
typealias PULONG Ptr{ULONG}
typealias USHORT Cushort
typealias PUSHORT Ptr{USHORT}
typealias UCHAR Cuchar
typealias PUCHAR Ptr{Cuchar}
typealias PSZ Ptr{Cchar}
typealias SCHAR Cchar
typealias SDWORD Cint
typealias SWORD Cshort
typealias UDWORD Cuint
typealias UWORD Cushort
typealias SLONG Cint
typealias SSHORT Cshort
typealias SDOUBLE Cdouble
typealias LDOUBLE Cdouble
typealias SFLOAT Cfloat
typealias PTR Ptr{Void}
typealias HENV Ptr{Void}
typealias HDBC Ptr{Void}
typealias HSTMT Ptr{Void}
typealias RETCODE Cshort
typealias SQLHWND Ptr{Void}

# Data Type Mappings
# SQL data types are returned in resultset metadata calls (ODBCMetadata)
# C data types are used in SQLBindCols (ODBCFetch) to allocate column memory; the driver manager converts from the SQL type to this C type in memory
# Julia types indicate how julia should read the returned C data type memory from the previous step

# Data Type Status: Pretty good, I think we're at 95% support, really only missing native date, time, interval, and GUID types (currently just read in as strings)

# SQL Data Type 					C Data Type 						Julia Type
# ---------------------------------------------------------------------------------
# SQL_CHAR 							SQL_C_CHAR 							Uint8
# SQL_VARCHAR 						SQL_C_CHAR 							Uint8
# SQL_LONGVARCHAR 					SQL_C_CHAR 							Uint8
# SQL_WCHAR 						SQL_C_WCHAR 						Uint8
# SQL_WVARCHAR 						SQL_C_WCHAR 						Uint8
# SQL_WLONGVARCHAR 					SQL_C_WCHAR 						Uint8
# SQL_DECIMAL 						SQL_C_DOUBLE 						Float64									
# SQL_NUMERIC 						SQL_C_DOUBLE 						Float64									
# SQL_SMALLINT 						SQL_C_SHORT 						Int16
# SQL_INTEGER 						SQL_C_LONG 							Int32
# SQL_REAL 							SQL_C_FLOAT 						Float64
# SQL_FLOAT 						SQL_C_DOUBLE 						Float64
# SQL_DOUBLE 						SQL_C_DOUBLE 						Float64
# SQL_BIT 							SQL_C_BIT 							Int8
# SQL_TINYINT 						SQL_C_TINYINT 						Int8
# SQL_BIGINT 						SQL_C_BIGINT 						Int64
# SQL_BINARY 						SQL_C_BINARY 						Uint8
# SQL_VARBINARY 					SQL_C_BINARY 						Uint8
# SQL_LONGVARBINARY 				SQL_C_BINARY 						Uint8
# SQL_TYPE_DATE 					SQL_C_TYPE_DATE 					Uint8
# SQL_TYPE_TIME 					SQL_C_TYPE_TIME 					Uint8
# SQL_TYPE_TIMESTAMP 				SQL_C_TYPE_TIMESTAMP 				Uint8
# SQL_INTERVAL_MONTH				SQL_C_INTERVAL_MONTH 				Uint8
# SQL_INTERVAL_YEAR					SQL_C_INTERVAL_YEAR 				Uint8
# SQL_INTERVAL_YEAR_TO_MONTH		SQL_C_INTERVAL_YEAR_TO_MONTH 		Uint8
# SQL_INTERVAL_DAY					SQL_C_INTERVAL_DAY 					Uint8
# SQL_INTERVAL_HOUR					SQL_C_INTERVAL_HOUR 				Uint8
# SQL_INTERVAL_MINUTE				SQL_C_INTERVAL_MINUTE 				Uint8
# SQL_INTERVAL_SECOND				SQL_C_INTERVAL_SECOND 				Uint8
# SQL_INTERVAL_DAY_TO_HOUR			SQL_C_INTERVAL_DAY_TO_HOUR 			Uint8
# SQL_INTERVAL_DAY_TO_MINUTE		SQL_C_INTERVAL_DAY_TO_MINUTE 		Uint8
# SQL_INTERVAL_DAY_TO_SECOND		SQL_C_INTERVAL_DAY_TO_SECOND 		Uint8
# SQL_INTERVAL_HOUR_TO_MINUTE		SQL_C_INTERVAL_HOUR_TO_MINUTE 		Uint8
# SQL_INTERVAL_HOUR_TO_SECOND		SQL_C_INTERVAL_HOUR_TO_SECOND 		Uint8
# SQL_INTERVAL_MINUTE_TO_SECOND		SQL_C_INTERVAL_MINUTE_TO_SECOND 	Uint8
# SQL_GUID							SQL_C_GUID 							Uint8

#SQL Data Type Definitions
const SQL_CHAR = int16(1) # Character string of fixed string length n.
const SQL_VARCHAR = int16(12) # Variable-length character string with a maximum string length n.
const SQL_LONGVARCHAR = int16(-1) # Variable length character data. Maximum length is data source–dependent.
const SQL_WCHAR = int16(-8) # Unicode character string of fixed string length n
const SQL_WVARCHAR = int16(-9) # Unicode variable-length character string with a maximum string length n
const SQL_WLONGVARCHAR = int16(-10) # Unicode variable-length character data. Maximum length is data source–dependent
const SQL_DECIMAL = int16(3) # 
const SQL_NUMERIC = int16(2)
const SQL_SMALLINT = int16(5) # Exact numeric value with precision 5 and scale 0 (signed: –32,768 <= n <= 32,767, unsigned: 0 <= n <= 65,535)
const SQL_INTEGER = int16(4) # Exact numeric value with precision 10 and scale 0 (signed: –2[31] <= n <= 2[31] – 1, unsigned: 0 <= n <= 2[32] – 1)
const SQL_REAL = int16(7) # Signed, approximate, numeric value with a binary precision 24 (zero or absolute value 10[–38] to 10[38]).
const SQL_FLOAT = int16(6) # Signed, approximate, numeric value with a binary precision of at least p. (The maximum precision is driver-defined.)
const SQL_DOUBLE = int16(8) # Signed, approximate, numeric value with a binary precision 53 (zero or absolute value 10[–308] to 10[308]).
const SQL_BIT = int16(-7) # Single bit binary data.
const SQL_TINYINT = int16(-6) # Exact numeric value with precision 3 and scale 0 (signed: –128 <= n <= 127, unsigned: 0 <= n <= 255)
const SQL_BIGINT = int16(-5) # Exact numeric value with precision 19 (if signed) or 20 (if unsigned) and scale 0 (signed: –2[63] <= n <= 2[63] – 1, unsigned: 0 <= n <= 2[64] – 1)
const SQL_BINARY = int16(-2) # Binary data of fixed length n.
const SQL_VARBINARY = int16(-3) # Variable length binary data of maximum length n. The maximum is set by the user.
const SQL_LONGVARBINARY = int16(-4) # Variable length binary data. Maximum length is data source–dependent.
#const SQL_TYPE_DATE = int16(91) # Year, month, and day fields, conforming to the rules of the Gregorian calendar.
#const SQL_TYPE_TIME = int16(92) # Hour, minute, and second fields, with valid values for hours of 00 to 23, valid values for minutes of 00 to 59, and valid values for seconds of 00 to 61. Precision p indicates the seconds precision.
#const SQL_TYPE_TIMESTAMP = int16(93) # Year, month, day, hour, minute, and second fields, with valid values as defined for the DATE and TIME data types.
#const SQL_INTERVAL_MONTH = int16(102) 
#const SQL_INTERVAL_YEAR  = int16(101) 
#const SQL_INTERVAL_YEAR_TO_MONTH = int16(107) 
#const SQL_INTERVAL_DAY = int16(103) 
#const SQL_INTERVAL_HOUR = int16(104) 
#const SQL_INTERVAL_MINUTE = int16(105) 
#const SQL_INTERVAL_SECOND = int16(106) 
#const SQL_INTERVAL_DAY_TO_HOUR = int16(108) 
#const SQL_INTERVAL_DAY_TO_MINUTE = int16(109) 
#const SQL_INTERVAL_DAY_TO_SECOND = int16(110) 
#const SQL_INTERVAL_HOUR_TO_MINUTE = int16(111) 
#const SQL_INTERVAL_HOUR_TO_SECOND = int16(112) 
#const SQL_INTERVAL_MINUTE_TO_SECOND = int16(113) 
#const SQL_GUID = int16(-11) # Fixed length GUID.

#C Data Types
const SQL_C_CHAR = int16(1)
const SQL_C_WCHAR = int16(-8)
const SQL_C_DOUBLE = int16(8)
const SQL_C_SHORT = int16(5)
const SQL_C_LONG = int16(4)
const SQL_C_FLOAT = int16(7)
const SQL_C_BIT = int16(-7)
const SQL_C_TINYINT = int16(-6)
const SQL_C_BIGINT = int16(-5)
const SQL_C_BINARY = int16(-2)
#const SQL_C_TYPE_DATE = int16(91)
#const SQL_C_TYPE_TIME = int16(92)
#const SQL_C_TYPE_TIMESTAMP = int16(93)
#const SQL_C_INTERVAL_MONTH = int16(102)
#const SQL_C_INTERVAL_YEAR = int16(101)
#const SQL_C_INTERVAL_YEAR_TO_MONTH = int16(107)
#const SQL_C_INTERVAL_DAY = int16(103)
#const SQL_C_INTERVAL_HOUR = int16(104)
#const SQL_C_INTERVAL_MINUTE = int16(105)
#const SQL_C_INTERVAL_SECOND = int16(106)
#const SQL_C_INTERVAL_DAY_TO_HOUR = int16(108)
#const SQL_C_INTERVAL_DAY_TO_MINUTE = int16(109)
#const SQL_C_INTERVAL_DAY_TO_SECOND = int16(110)
#const SQL_C_INTERVAL_HOUR_TO_MINUTE = int16(111)
#const SQL_C_INTERVAL_HOUR_TO_SECOND = int16(112)
#const SQL_C_INTERVAL_MINUTE_TO_SECOND = int16(113)
#const SQL_C_GUID = int16(-11)

const SQL2C = [
	SQL_CHAR=>SQL_C_CHAR,
	SQL_VARCHAR=>SQL_C_CHAR,
	SQL_LONGVARCHAR=>SQL_C_CHAR,
	SQL_WCHAR=>SQL_C_WCHAR,
	SQL_WVARCHAR=>SQL_C_WCHAR,
	SQL_WLONGVARCHAR=>SQL_C_WCHAR,
	SQL_DECIMAL=>SQL_C_DOUBLE,
	SQL_NUMERIC=>SQL_C_DOUBLE,
	SQL_SMALLINT=>SQL_C_SHORT,
	SQL_INTEGER=>SQL_C_LONG,
	SQL_REAL=>SQL_C_FLOAT,
	SQL_FLOAT=>SQL_C_DOUBLE,
	SQL_DOUBLE=>SQL_C_DOUBLE,
	SQL_BIT=>SQL_C_BIT,
	SQL_TINYINT=>SQL_C_TINYINT,
	SQL_BIGINT=>SQL_C_BIGINT,
	SQL_BINARY=>SQL_C_BINARY,
	SQL_VARBINARY=>SQL_C_BINARY,
	SQL_LONGVARBINARY=>SQL_C_BINARY]
const SQL2Julia = [
	SQL_CHAR=>Uint8,
	SQL_VARCHAR=>Uint8,
	SQL_LONGVARCHAR=>Uint8,
	SQL_WCHAR=>Uint8,
	SQL_WVARCHAR=>Uint8,
	SQL_WLONGVARCHAR=>Uint8,
	SQL_DECIMAL=>Float64,
	SQL_NUMERIC=>Float64,
	SQL_SMALLINT=>Int16,
	SQL_INTEGER=>Int32,
	SQL_REAL=>Float64,
	SQL_FLOAT=>Float64,
	SQL_DOUBLE=>Float64,
	SQL_BIT=>Int8,
	SQL_TINYINT=>Int8,
	SQL_BIGINT=>Int64,
	SQL_BINARY=>Uint8,
	SQL_VARBINARY=>Uint8,
	SQL_LONGVARBINARY=>Uint8]
const SQL_TYPES = [
	1=>"SQL_CHAR",
	12=>"SQL_VARCHAR",
	-1=>"SQL_LONGVARCHAR",
	-8=>"SQL_WCHAR",
	-9=>"SQL_WVARCHAR",
	-10=>"SQL_WLONGVARCHAR",
	3=>"SQL_DECIMAL",
	2=>"SQL_NUMERIC",
	5=>"SQL_SMALLINT",
	4=>"SQL_INTEGER",
	7=>"SQL_REAL",
	6=>"SQL_FLOAT",
	8=>"SQL_DOUBLE",
	-7=>"SQL_BIT",
	-6=>"SQL_TINYINT",
	-5=>"SQL_BIGINT",
	-2=>"SQL_BINARY",
	-3=>"SQL_VARBINARY",
	-4=>"SQL_LONGVARBINARY",
	91=>"SQL_TYPE_DATE",
	92=>"SQL_TYPE_TIME",
	93=>"SQL_TYPE_TIMESTAMP",
	102=>"SQL_INTERVAL_MONTH",
	101=>"SQL_INTERVAL_YEAR",
	107=>"SQL_INTERVAL_YEAR_TO_MONTH",
	103=>"SQL_INTERVAL_DAY",
	104=>"SQL_INTERVAL_HOUR",
	105=>"SQL_INTERVAL_MINUTE",
	106=>"SQL_INTERVAL_SECOND",
	108=>"SQL_INTERVAL_DAY_TO_HOUR",
	109=>"SQL_INTERVAL_DAY_TO_MINUTE",
	110=>"SQL_INTERVAL_DAY_TO_SECOND",
	111=>"SQL_INTERVAL_HOUR_TO_MINUTE",
	112=>"SQL_INTERVAL_HOUR_TO_SECOND",
	113=>"SQL_INTERVAL_MINUTE_TO_SECOND",
	-11=>"SQL_GUID"]