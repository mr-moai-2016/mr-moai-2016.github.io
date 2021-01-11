/* 0-byte avoidance */

function MstyUI_detailBtn( tgt_id, btn_id, open_lbl, close_lbl ){
	var tgt=document.getElementById( tgt_id );
	var btn=document.getElementById( btn_id );
	if( tgt.className=='MstyUnvisible' ){
		tgt.className = 'MstyVisible';
		btn.innerHTML = close_lbl;
	} else{
		tgt.className = 'MstyUnvisible';
		btn.innerHTML = open_lbl;
	}
}

function MstyUI_submitBtn( form, cgi_urp, cgi_arg ){
	if( form ){
		if( cgi_arg != null && cgi_arg != '' ){
			form.action = cgi_urp + "?" + cgi_arg;
		} else {
			form.action = cgi_urp;
		}
		form.submit();
	}
}
function MstyUI_submitBtn_byId( form_id, cgi_urp, cgi_arg ){
	var form=document.getElementById( form_id );
	MstyUI_submitBtn( form, cgi_urp, cgi_arg );
}

function MstyUI_selectTab( id_ary, query_btn_id ){
	var idx;
	for( idx=0; idx<id_ary.length;  ++idx ){
		var id     = id_ary[ idx ];
		///var tgt_id = id + "_tgt";
		var tgt_id = id;
		var btn_id = id + "_btn";
		var tgt    = document.getElementById( tgt_id );
		var btn    = document.getElementById( btn_id );

		if( query_btn_id == btn_id ){
			if( tgt.className=='MstyUnvisible' ){
				tgt.className = 'block';
				btn.className = 'MstyNowSelectedLink';
			} else{
				tgt.className = 'MstyUnvisible';
				btn.className = 'MstyDetailLink';
			}
		} else {
			tgt.className = 'MstyUnvisible';
			btn.className = 'MstyDetailLink';
		}
	}
}
function MstyUI_categoryTab( tgt_id_ary, btn_cat_ary, query_btn_id ){
	var idx;
	var all_clear    = false;
	var query_id_ary = [];

	for( idx=0; idx<btn_cat_ary.length;  ++idx ){
		var btn_cat = btn_cat_ary[ idx ];
		var btn_id  = btn_cat.id;
		var btn     = document.getElementById( btn_id );

		if( query_btn_id == btn_id ){
			query_id_ary = btn_cat.cat;
			if( btn.className=='MstyDetailLink' ){
				btn.className = 'MstyNowSelectedLink';
			} else{
				btn.className = 'MstyDetailLink';
				all_clear     = true;
			}
		} else {
			btn.className = 'MstyDetailLink';
		}
	}

	if( all_clear ){
		for( idx=0; idx<tgt_id_ary.length;  ++idx ){
			var tgt_id = tgt_id_ary[ idx ];
			var tgt    = document.getElementById( tgt_id );
			tgt.className = 'MstyUnvisible';
		}
	} else {
		for( idx=0; idx<tgt_id_ary.length;  ++idx ){
			var tgt_id = tgt_id_ary[ idx ];
			var tgt    = document.getElementById( tgt_id );
			var found  = false;
	
			for( var query_id_idx in query_id_ary ){
				if( query_id_ary[ query_id_idx ] == tgt_id ){
					found = true;
					break;
				}
			}
			if( found ){
				tgt.className = 'block';
			} else {
				tgt.className = 'MstyUnvisible';
			}
		}
	}
}
