~ | A | B | C | D
A | 0 | 99| 44| 88
B | 1 | 0 | 89| 4
C | 8 | 31| 0 | 99
D | 21| 82| 51| 0

D -> A = 21
	A -> B = 99
		B -> C = 89
			C -> D = 99
	A -> C = 44
		C -> B = 31
			B -> D = 4
D -> B = 82
	B -> A = 1
		A -> C = 44
			C -> D = 99
	B -> C = 89
		C -> A = 8
			A -> D = 88
D -> C = 51
	C -> A = 8
		A -> B = 99
			B -> D = 4
	C -> B = 31
		B -> A = 1
			A -> D = 88

DABCD = 21+99+89+99 = 308
DACBD = 21+44+31+4 = 100
DBACD = 82+1+44+99 = 226
DBCAD = 82+89+8+88 = 267
DCABD = 51+8+99+4 = 162
DCBAD = 51+31+1+88 = 171
projected answer = 100
calculated answer = 100
CORRECT

---

~ | A | B | C | D
A | 0 | 8 | 49| 80
B | 90| 0 | 21| 44
C | 98| 67| 0 | 56
D | 62| 52| 42| 0

A -> B -> C -> D -> A = 8+21+56+62 = 147
A -> B -> D -> C -> A = 8+44+42+98 = 192
A -> C -> B -> D -> A = 49+67+44+62 = 222
A -> C -> D -> B -> A = 49+56+52+90 = 247
A -> D -> B -> C -> A = 80+52+21+98 = 251
A -> D -> C -> B -> A = 80+42+67+90 = 279
projectd answer = 147
calculated answer = 147
CORRECT

---

~ | A | B | C | D
A | 0 | 64| 85| 7
B | 97| 0 | 73| 96
C | 57| 40| 0 | 48
D | 61| 32| 83| 0

ABCDA = 64+73+48+61 = 246
ABDCA = 64+96+83+57 = 300
ACBDA = 85+40+96+61 = 282
ACDBA = 85+48+32+97 = 262
ADBCA = 7+32+73+57 = 169
ADCBA = 7+83+40+97 = 227
projected answer = 169
calculated answer = 169
CORRECT