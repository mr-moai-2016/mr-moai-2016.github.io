/*
Language: Raraku
Category: common, system
Website: https://https://mr-moai-2016.github.io/moai2.0/raraku.html
*/

/** @type LanguageFn */
//export default function(hljs) {
function get_raraku(hljs) {
	const regex = hljs.regex;

	const C_LINE_COMMENT_MODE   = hljs.COMMENT('//', '$');
	const RRK_LINE_COMMENT_MODE = hljs.COMMENT('#[ \t\r\n]', '$');
	
	const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
	  illegal: null,
	});

	const RRK_BLOCK_COMMENT_MODE = hljs.END_SAME_AS_BEGIN({
		//begin: '^[ \t]*#(=*)\\*',
		//end:   '^[ \t]*\\*(=*)#',
		begin: '#(=*)\\*',
		end:   '\\*(=*)#',
		//end:   '\\*(=*)#',
		//contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
		contains: [],
		className: 'comment'
	});
	const RRK_BLOCK_COMMENT_MODE2 = hljs.END_SAME_AS_BEGIN({
		begin: '#(=*)\\*',
		end:   '\\*(=*)#',
		//contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
		//contains: [ { begin: /[^\n]*/ } ],
		contains: [],
		className: 'operator'
	});
	
	const RRK_IF1_COMMENT_MODE = {
		className: 'comment',
		variants: [
		  {
		    begin: '^[ \t]*#if 1',
		    end:   '(^[ \t]*#endif|^[ \t]*#else)',
		    contains: [ 'self' ]
		  },
		]
	};
	const RRK_IF0_COMMENT_MODE = {
		className: 'comment',
		variants: [
		  {
		    begin: '^[ \t]*#if 0',
		    end:   '(^[ \t]*#endif|^[ \t]*#else)',
		    contains: [ 'self', RRK_IF1_COMMENT_MODE ]
		  },
		]
	};
	
	
	const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
	const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
	const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
	const FUNCTION_TYPE_RE = '(' +
	  DECLTYPE_AUTO_RE + '|' +
	  regex.optional(NAMESPACE_RE) +
	  '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE) +
	')';

	const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';

	const STRINGS_S_BEGIN = {
	  className: 'operator',
	  variants: [
	    {
	      begin: '@\'',
	      contains: []
	    },
	    {
	      begin: '\'',
	      contains: []
	    }
	  ]
	};
	const STRINGS_S_END = {
	  className: 'operator',
	  variants: [
	    {
	      begin: '\'',
	      contains: []
	    }
	  ]
	};
	const STRINGS_SB_BEGIN = {
	  className: 'operator',
	  variants: [
	    {
	      begin: '@\\[\'',
	      contains: []
	    }
	  ]
	};
	const STRINGS_SB_END = {
	  className: 'operator',
	  variants: [
	    {
	      begin: '\'\\]',
	      contains: []
	    },
	    {
	      begin: '@\\[\'',
	      contains: []
	    }
	  ]
	};

	//const RARAKU_DEC_NUMBER = '\\b([\\d]+(_[\\d]+)*(u?|\\.[\\d]+(_[\\d]+)*))';
	const RARAKU_DEC_NUMBER = '\\b([\\d]+(_[\\d]+)*(\\.[\\d]+(_[\\d]+)*)?)';
	const NUMBERS = {
		className: 'number',
		variants: [
			{
				begin: '\\b(0b[01\']+)'
			},
			{
				//begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
				begin: '\\b([\\d]+(_[\\d]+)*u)'
			},
			{
				//begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
				begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(' + RARAKU_DEC_NUMBER + ')([eE][-+]?[\\d\']+)?)'
			}
		],
		relevance: 0
	};

	const TITLE_MODE = {
		className: 'title',
		begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
		relevance: 0
	};

	const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

	const RARAKU_KEYWORDS = [
		"auto",
		"break",
		"case",
		"const",
		"continue",
		"default",
		"defer",
		"dowhile",
		"elif",
		"else",
		"fallthrough",
		"final",
		"for",
		"foreach",
		"function",
		"goto",
		"global",
		"if",
		"import",
		"immut",
		"introvert", /* reserve */
		"lambda",
		"longjmp",
		"natvfunc",
		"notnull",
		"object",
		"pragma",
		"refer",
		"return",
		"setjmp",
		"switch",
		"tight",
		"try",
		"unsetjmp",
		"utilize",
		"varia",
		"while",
		"using", /* reserve */
	];

	const C_TYPES = [
		"void",
		"bool",
		"uint",
		"uint8",
		"uint16",
		"uint32",
		"uint64",
		"int",
		"int8",
		"int16",
		"int32",
		"int64",
		"real",
		"real32",
		"real64",
		"string",
		"conststr",
		"static",
		"shadow", /* reserve */
		"tightstr", /* reserve */
		"complex", /* reserve */
	];

	const RRK_TYPEDEF_STMT = [
		"array",
		"enum",
		"functype",
		"handler",
		"natvobj",
		"struct",
		"trait",
		"numerical",
		"comparable",
		"modifier",
		"nullkind",
	];
	
	const HAT_OPERATORS = [
		"^a_numof",
		"^b_or",
		"^b_and",
		"^b_xor",
		"^b_shift_l",
		"^b_shift_r",
		"^b_is",
		"^b_not32",
		"^b_not64",
		"^b_set",
		"^b_unset",
		"^b_filt",
		"^b_set_xor",
		"^b_set_shift_l",
		"^b_set_shift_r",
		"^copy_pod",
		"^copy_str",
		"^downcast",
		"^fun",
		"^func_name",
		"^file_name",
		"^file_path",
		"^impl",
		"^lam",
		"^leng", /* draft */
		"^line_no",
		"^skimp",
		"^^",
		"^!",
		"^?",
//		"^<",
		"^.", /* draft */
		"..",
		"->",
		":=",
	];

	const KEYWORDS = {
		keyword: RARAKU_KEYWORDS,
		//    $pattern: /[_a-zA-Z][_a-zA-Z0-9]*|\.\./, // allow keywords to begin with dash
		type: C_TYPES,
		literal: 'true false null Rrk_NPOS Rrk_EXIT_SUCCESS Rrk_EXIT_FAILURE',
		// TODO: apply hinting work similar to what was done in cpp.js
		built_in: 'Rrk_print Rrk_print_c Rrk_arynum Rrk_numof Rrk_getCmdLineArgs Rrk_fopen Rrk_fclose Rrk_fgets Rrk_enum_ary' +' '+
			'RrkFile RrkBird Rrk_push_bk Rrk_pop_bk' +' '+
			'RrkStr_at RrkStr_leng RrkStr_assign RrkStr_replace' +' '+
			'',
	};
	const R_KEYWORDS = {
		//$pattern: /[a-zA-Z_][a-zA-Z_0-9]*|\.\.|\->|:=|\^[a-zA-Z_^\!]+/, // allow keywords to begin with dash
		//$pattern: /[a-zA-Z_][a-zA-Z_0-9]*|\.\.|\->|:=|\^\^|\^!|\^a_[\w]+|\^b_[\w]+|\^copy_[\w]+|\^downcast|\^fun|^\func_name|\^file_[\w]+|\^lam|\^impl/, // allow keywords to begin with dash
		keyword: KEYWORDS,
		$pattern: "[a-zA-Z_][a-zA-Z_0-9]*"
			+ "|" + "\\^a_[\\w]+"
			+ "|" + "\\^b_[\\w]+"
			+ "|" + "\\^copy_[\\w]+"
			+ "|" + "\\^downcast"
			+ "|" + "\\^fun"
			+ "|" + "\\^func_name"
			+ "|" + "\\^file_[\\w]+"
			+ "|" + "\\^impl"
			+ "|" + "\\^lam"
			+ "|" + "\\^line_no"
			+ "|" + "\\^skimp"
			+ "|" + "\\^\\^"
			+ "|" + "\\^!"
			+ "|" + "\\^\\?"
			+ "|" + "\\.\\."
			+ "|" + "\\->"
			+ "|" + ":="
		, // allow keywords to begin with dash
		operator: HAT_OPERATORS,
		section:   RRK_TYPEDEF_STMT,
	};

	const PREPROCESSOR = {
		//className: 'operator',
		//className: 'symbol',
		className: 'bullet',
		//className: 'doctag',
		//className: 'punctuation',
		//className: 'params',
		//begin: /#\s*[a-z]+\b/,
		begin: /#(if|else|endif|line|define|def_begin|def_end|block_scope_begin|block_scope_end|extern)\b/,
		end: /$/,
		keywords: R_KEYWORDS,
		contains: [
			{
				begin: /\\\n/,
				relevance: 0
			},
			NUMBERS,
			//R_KEYWORDS,
			C_LINE_COMMENT_MODE,
			RRK_LINE_COMMENT_MODE,
			RRK_BLOCK_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		]
	};

	const STRING_3_CALLBACK = function(mode) {
		return Object.assign(mode,
			{
				'on:begin': (m, resp) => {
					resp.data._rrk_heredoc_identifier  = m[2];
					resp.data._rrk_heredoc_flexbracket = m[3];
					//console.log( "begin:m.length=[" + m.length + "]" )
					//console.log( "begin:m[0]=[" + m[0] + "]" )
					//console.log( "  begin:m[1]=[" + m[2] + "]" )
					//console.log( "  begin:m[2]=[" + m[3] + "]" )
				},
				'on:end': (m, resp) => {
					console.log( "end:m[0]=[" + m[0] + "]" )

					//console.log( "  end:m[1]=[" + m[1] + "]" )
					if( resp.data._rrk_heredoc_flexbracket.length != m[1].length ){
						resp.ignoreMatch();
					}
					if( resp.data._rrk_heredoc_flexbracket.length > 0 ){
						var begin_bracket = resp.data._rrk_heredoc_flexbracket[0];
						var begin_eq      = resp.data._rrk_heredoc_flexbracket.substr(1);
						var end_eq        = m[1].substr(0,m[1].length-1);
						var end_bracket   = m[1][ m[1].length-1 ];
						//console.log( "  end:begin_bracket=[" + begin_bracket + "]" );
						//console.log( "  end:begin_eq=["      + begin_eq + "]" );
						//console.log( "  end:end_eq=["        + end_eq + "]" );
						//console.log( "  end:end_bracket=["   + end_bracket + "]" );
						if( begin_eq !== end_eq ){
							resp.ignoreMatch();
						}
					}

					if( resp.data._rrk_heredoc_identifier  !== m[2] ) resp.ignoreMatch();
					//console.log( "  end:m[2]=[" + m[2] + "]" )
				}
			});
	};
	const SUBST = {
		scope: 'subst',
		//scope: 'attribute',
		variants: [
		  //{ begin: /\$\w+/ },
		  { begin: /\$=*\{/, end: /\}/ }
		],
		keywords: R_KEYWORDS,
		contains: [] // defined later
	};
	const STRING_3 = STRING_3_CALLBACK({
		begin: '@[$=%&,]*[\\-\\+\\~\\^\\|!0-9]*(/"[^"]*"|)' + '(\\w*)'   + '(\\[=*|)' + '\'',
		end:   '\''                        + '(=*\\]|)' + '(\\w*)',
		//end:   '\\*(=*)#',
		//contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
		contains: [ SUBST ],
		className: 'string'
	});
	const STRINGS = [
		//STRING_1,
		//STRING_2,
		STRING_3,
		hljs.QUOTE_STRING_MODE
	];
	const EXPRESSION_CONTAINS = [
		PREPROCESSOR,
		//TYPES,
		RRK_BLOCK_COMMENT_MODE,
		//RRK_IF0_COMMENT_MODE,
		RRK_LINE_COMMENT_MODE,
		C_LINE_COMMENT_MODE,
		hljs.C_BLOCK_COMMENT_MODE,
		NUMBERS,
		STRINGS,
		//STRINGS_BEGIN
	];
	SUBST.contains = SUBST.contains.concat(
		EXPRESSION_CONTAINS
	);

	const EXPRESSION_CONTEXT = {
		// This mode covers expression context where we can't expect a function
		// definition and shouldn't highlight anything that looks like one:
		// `return some()`, `else if()`, `(x*sum(1, 2))`
		variants: [
		  {
		    begin: /=/,
		    end: /;/
		  },
		  {
		    begin: /\(/,
		    end: /\)/
		  },
		  {
		    //beginKeywords: 'new throw return else',
		    beginKeywords: 'new throw return',
		    end: /;/
		  }
		],
		keywords: R_KEYWORDS,
		contains: EXPRESSION_CONTAINS.concat([
		  {
		    begin: /\(/,
		    end: /\)/,
		    keywords: R_KEYWORDS,
		    contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
		    relevance: 0
		  }
		]),
		relevance: 0
	};

	const FUNCTION_DECLARATION = {
		begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
		returnBegin: true,
		end: /[{;=]/,
		excludeEnd: true,
		keywords: R_KEYWORDS,
		illegal: /[^\w\s\*&:<>.]/,
		contains: [
			{ // to prevent it from being confused as the function title
			  begin: DECLTYPE_AUTO_RE,
			  keywords: R_KEYWORDS,
			  relevance: 0
			},
			{
			  begin: FUNCTION_TITLE,
			  returnBegin: true,
			  contains: [
			    hljs.inherit(TITLE_MODE, { className: "title.function" })
			  ],
			  relevance: 0
			},
			// allow for multiple declarations, e.g.:
			// extern void f(int), g(char);
			{
				relevance: 0,
				match: /,/
			},
			{
				className: 'params',
				begin: /\(/,
				end: /\)/,
				keywords: R_KEYWORDS,
				relevance: 0,
				contains: [
					//C_LINE_COMMENT_MODE,
					//RRK_LINE_COMMENT_MODE,
					//RRK_BLOCK_COMMENT_MODE,
					//RRK_IF0_COMMENT_MODE,
					//hljs.C_BLOCK_COMMENT_MODE,
					STRINGS,
					NUMBERS,
					//TYPES,
					// Count matching parentheses.
					{
					  begin: /\(/,
					  end: /\)/,
					  keywords: R_KEYWORDS,
					  relevance: 0,
					  contains: [
					    'self',
					    //C_LINE_COMMENT_MODE,
					    //RRK_LINE_COMMENT_MODE,
					    //RRK_BLOCK_COMMENT_MODE,
					    //RRK_IF0_COMMENT_MODE,
					    //hljs.C_BLOCK_COMMENT_MODE,
					    STRINGS,
					    NUMBERS
					    // TYPES
					  ]
					}
				]
			},
			//TYPES,
			//C_LINE_COMMENT_MODE,
			//RRK_LINE_COMMENT_MODE,
			//RRK_BLOCK_COMMENT_MODE,
			//RRK_IF0_COMMENT_MODE,
			//hljs.C_BLOCK_COMMENT_MODE,
			PREPROCESSOR
		]
	};
	
	
	return {
		name: "raraku",
		aliases: [
		  'rrks', 'rrkh'
		],
		keywords: R_KEYWORDS,
		// Until differentiations are added between `c` and `cpp`, `c` will
		// not be auto-detected to avoid auto-detect conflicts between C and C++
		disableAutodetect: true,
		illegal: '</',
		contains: [].concat(
			RRK_BLOCK_COMMENT_MODE,
			RRK_IF0_COMMENT_MODE,
			RRK_LINE_COMMENT_MODE,
			C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			
			EXPRESSION_CONTEXT,
			FUNCTION_DECLARATION,
			EXPRESSION_CONTAINS,
			[
			  PREPROCESSOR,
			  {
			    begin: hljs.IDENT_RE + '::',
			    keywords: R_KEYWORDS
			  },
			  {
			    className: 'class',
			    //beginKeywords: 'enum class struct union',
			    beginKeywords: 'union',
			    end: /[{;:<>=]/,
			    contains: [
			      {
			        beginKeywords: "final class struct"
			      },
			      hljs.TITLE_MODE
			    ]
			  }
			]
		),
		exports: {
		  preprocessor: PREPROCESSOR,
		  strings: STRINGS,
		  keywords: R_KEYWORDS
		}
	};
}
