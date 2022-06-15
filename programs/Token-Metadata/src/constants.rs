pub const PREFIX: &str = "esmetadata";

pub const MAX_NAME_LENGTH: usize = 32;

pub const MAX_SYMBOL_LENGTH: usize = 10;

pub const MAX_URI_LENGTH: usize = 200;

pub const MAX_DATA_SIZE : usize = 
4
+ MAX_NAME_LENGTH // name
+ 4 
+ MAX_SYMBOL_LENGTH // symbol
+ 4 
+ MAX_URI_LENGTH // uri
+ 2
+ 1
+ 4
+ MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;

pub const MAX_CREATOR_LIMIT: usize = 5;

pub const MAX_CREATOR_LEN: usize = 32 + 1 + 1;

pub const MAX_META_DATA_SIZE : usize =
1 // key
+ 32 // udpate auth key
+ 32 // mint pubkey
+ MAX_DATA_SIZE
+ 1 // primary sale
+ 1 // mutable
+ 118; // Padding