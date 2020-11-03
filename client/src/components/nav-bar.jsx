import React from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

const StyledNavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  background-color: #24292f;
`

const boxFade = keyframes`
  0% {
    fill: rgba(255, 255, 255, 0);
  }

  30% {
    fill: rgba(255, 255, 255, 1);
  }

  100% {
    fill: rgba(255, 255, 255, 1);
  }
`

const StyledPath = styled.path`
  stroke: white; 
  animation: ${boxFade} 8s linear alternate infinite;
`

const LogoutBtn = styled.button`
  position: absolute;
  top: 3.5%;
  right: 2%;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`
const NavBar = ({ mode }) => {
  const logoutOnclickHandler = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/user/signOut",
      withCredentials: true,
    })
      .then((res) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const cookie = 'user=; Expires=' + date.toUTCString();
        document.cookie = cookie;
        document.location = '/';
      });
  }

  switch (mode) {
    case "login":
      return (
        <StyledNavBar />
      );

    case "main":
      return (
        <StyledNavBar>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="300" height="100" viewBox="0 0 1813.000000 727.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,850.000000) scale(0.12000,-0.12000)">
                <StyledPath d="M9475 5546 c-215 -37 -392 -142 -598 -355 -96 -99 -125 -141 -98 -141 5 0 34 30 65 68 126 149 306 285 460 348 208 84 422 83 559 -3 44 -28 121 -102 113 -110 -2 -3 -44 -18 -93 -35 -398 -133 -766 -481 -892 -843 -30 -86 -35 -113 -35 -195 -1 -82 3 -103 25 -150 36 -77 71 -115 136 -147 102 -49 274 -33 420 41 130 65 247 165 361 309 242 305 303 660 167 971 -8 18 -2 18 161 14 191 -6 330 -26 668 -96 l228 -48 -79 -46 c-180 -105 -369 -275 -537 -484 -105 -132 -182 -243 -354 -516 -143 -226 -244 -374 -325 -471 -250 -302 -539 -457 -848 -457 -215 0 -404 86 -468 214 -28 58 -33 158 -8 183 14 14 16 12 22 -31 8 -53 33 -76 80 -76 67 1 115 56 115 133 0 40 -5 54 -29 78 -24 24 -38 29 -76 29 -95 0 -157 -69 -163 -180 -6 -98 17 -161 83 -226 121 -121 325 -176 572 -154 182 17 305 51 481 135 240 115 445 279 560 448 47 68 141 237 264 472 197 376 299 535 448 696 85 93 160 155 253 212 l57 34 108 -18 c284 -49 597 -65 779 -39 222 30 381 103 398 181 15 68 -41 122 -155 150 -80 20 -349 17 -475 -5 -127 -23 -280 -66 -395 -112 l-90 -35 -278 55 c-152 30 -324 60 -382 67 -169 19 -474 -1 -609 -41 -33 -9 -37 -7 -90 43 -31 29 -72 62 -91 74 -100 60 -267 84 -415 59z m2787 -137 c104 -18 168 -56 168 -100 0 -34 -56 -77 -134 -102 -62 -19 -91 -22 -231 -21 -158 1 -299 19 -580 72 l-89 17 81 32 c259 102 563 141 785 102z m-2223 -170 c22 -57 25 -79 26 -194 0 -139 -14 -220 -61 -343 -78 -207 -245 -442 -407 -570 -191 -152 -399 -186 -517 -84 -124 105 -131 312 -20 539 129 263 441 549 714 654 85 33 215 70 230 65 5 -1 21 -31 35 -67z"/>
                <StyledPath d="M5462 5465 c-88 -34 -218 -99 -279 -139 -56 -37 -140 -58 -378 -97 -190 -30 -395 -76 -514 -115 -156 -51 -252 -106 -342 -194 -114 -113 -157 -222 -147 -376 10 -151 78 -260 212 -338 36 -21 66 -41 66 -43 0 -13 -257 -383 -322 -464 -242 -301 -514 -467 -816 -498 -230 -24 -447 49 -538 182 -40 58 -61 143 -48 194 13 53 30 52 37 -4 6 -56 25 -73 83 -73 55 0 99 36 115 93 47 176 -183 208 -255 35 -9 -21 -16 -66 -16 -100 0 -121 75 -224 214 -292 194 -96 482 -99 760 -9 137 44 333 143 451 228 213 153 302 261 461 561 l54 101 103 6 c116 7 216 36 304 89 68 41 168 138 215 210 41 61 73 150 64 175 -9 24 -21 7 -40 -57 -57 -203 -294 -374 -535 -388 l-94 -5 48 89 c189 349 405 656 604 855 144 143 187 172 329 219 199 66 353 144 336 171 -9 16 -68 8 -132 -16z m-402 -219 c0 -2 -35 -30 -77 -62 -297 -221 -575 -525 -818 -895 l-66 -99 -47 24 c-157 80 -206 282 -113 464 64 126 213 252 416 352 163 80 230 104 483 170 176 46 222 55 222 46z"/>
                <StyledPath d="M13864 4401 c-186 -311 -346 -582 -357 -601 -36 -63 -168 -223 -271 -328 -161 -166 -282 -242 -384 -242 -109 0 -152 44 -152 157 0 119 54 252 174 428 77 114 226 267 286 294 82 38 157 19 161 -39 6 -74 -27 -120 -125 -175 -123 -69 -172 -149 -126 -208 81 -103 274 97 288 299 9 136 -42 186 -167 164 -191 -33 -471 -239 -580 -428 -86 -147 -306 -398 -405 -461 -63 -39 -109 -41 -132 -6 -39 60 11 173 255 578 88 148 165 276 170 286 9 15 1 17 -94 17 l-104 0 -16 -37 c-9 -20 -25 -49 -35 -64 l-18 -28 0 48 c0 38 -6 53 -26 74 -23 23 -34 26 -89 24 -79 -2 -204 -46 -323 -115 -172 -98 -269 -181 -374 -318 -115 -151 -216 -213 -305 -189 -61 17 -81 89 -61 212 8 53 1 46 165 153 152 100 211 161 211 217 0 32 -29 50 -67 41 -86 -20 -193 -123 -264 -256 -30 -55 -67 -104 -116 -152 -40 -40 -73 -71 -73 -70 0 1 20 40 44 88 81 158 88 291 20 360 -63 62 -127 41 -245 -81 -78 -79 -229 -267 -229 -284 0 -23 20 -2 82 84 146 205 260 309 305 281 58 -36 8 -143 -280 -614 -83 -135 -157 -255 -165 -267 l-14 -23 105 0 104 0 48 83 c93 160 214 333 278 396 l65 64 -5 -80 c-7 -105 10 -145 72 -169 63 -24 128 -6 212 58 56 42 65 46 59 26 -18 -57 -18 -176 -1 -231 31 -99 110 -166 196 -167 47 0 125 40 181 94 42 40 179 207 220 266 14 22 14 16 -3 -38 -38 -125 -17 -232 57 -289 106 -80 229 -11 446 249 50 60 91 108 92 108 0 0 0 -34 -2 -75 -3 -63 0 -83 24 -135 47 -106 154 -180 259 -180 126 0 312 132 520 370 55 63 55 63 -78 -170 -55 -96 -101 -177 -102 -180 -2 -3 42 -5 96 -4 90 0 101 2 115 22 8 12 76 133 150 269 153 280 172 311 408 693 93 151 213 347 266 435 53 88 120 198 149 244 l53 84 -53 -6 c-30 -4 -77 -3 -106 2 l-52 8 -337 -566z m-1674 -298 c17 -22 21 -37 17 -70 -17 -150 -381 -658 -555 -773 -77 -51 -151 -36 -171 36 -35 128 98 380 336 634 161 172 317 244 373 173z"/>
                <StyledPath d="M5060 4402 c-46 -48 -90 -128 -109 -199 -7 -26 -57 -96 -156 -218 l-146 -179 -45 -3 c-122 -7 -254 -178 -262 -340 -5 -84 9 -132 51 -179 54 -62 99 -79 207 -78 144 1 271 47 375 137 l39 34 22 -48 c47 -100 150 -141 305 -121 137 19 248 72 330 159 64 66 84 117 83 208 0 72 -6 95 -59 235 -52 137 -59 165 -63 245 l-4 90 62 65 c120 124 166 192 154 225 -9 21 -57 19 -86 -4 -41 -33 -96 -122 -122 -199 -22 -64 -43 -94 -170 -250 -142 -175 -145 -177 -184 -178 -54 -2 -120 -42 -163 -98 -19 -25 -36 -45 -39 -46 -10 0 -102 257 -117 325 -8 40 -12 91 -9 119 5 44 13 56 85 131 90 94 131 153 131 190 0 21 -4 25 -32 25 -25 0 -42 -10 -78 -48z m-126 -515 c-1 -223 -2 -235 -26 -299 -91 -243 -283 -391 -433 -334 -117 45 -137 170 -43 272 32 35 54 48 107 64 88 26 129 53 147 95 13 31 12 39 -1 71 -8 20 -12 42 -7 48 7 13 253 316 256 316 0 0 1 -105 0 -233z m675 15 c1 -246 -6 -290 -65 -403 -46 -87 -137 -186 -203 -223 -73 -39 -146 -45 -205 -17 -80 39 -108 119 -72 206 30 71 78 108 180 135 97 26 152 109 111 168 -15 21 -11 28 117 187 73 90 134 165 134 165 1 0 2 -98 3 -218z"/>
                <StyledPath d="M7630 4153 c-213 -35 -554 -252 -650 -413 -52 -87 -204 -285 -283 -367 -89 -93 -164 -143 -214 -143 -80 0 -84 80 -10 231 26 53 126 226 222 384 96 157 175 287 175 289 0 1 -46 2 -103 2 l-103 0 -84 -145 c-314 -535 -498 -761 -621 -761 -56 0 -76 40 -58 119 14 64 35 101 241 442 102 168 190 314 196 325 11 20 9 20 -91 20 l-101 -1 -144 -240 c-79 -132 -162 -278 -185 -325 -39 -78 -42 -91 -42 -166 0 -71 3 -85 28 -123 31 -46 91 -80 142 -81 70 0 151 66 293 240 47 58 89 109 93 114 5 5 -3 -18 -16 -50 -41 -100 -26 -193 41 -256 107 -100 233 -41 445 210 45 53 88 103 94 110 10 11 12 -3 12 -65 0 -99 26 -165 93 -227 68 -64 137 -84 233 -68 78 14 167 57 253 123 136 105 435 449 390 449 -3 0 -47 -53 -99 -117 -113 -141 -267 -293 -357 -351 -72 -47 -171 -82 -231 -82 -58 0 -117 27 -136 63 -34 67 -13 181 60 311 l33 59 124 28 c344 79 524 171 558 287 16 54 15 72 -8 110 -33 54 -106 79 -190 65z m98 -35 c7 -7 12 -25 12 -40 0 -85 -109 -191 -290 -283 -57 -29 -272 -106 -278 -100 -7 7 93 131 178 218 92 97 182 169 245 198 46 21 115 25 133 7z"/>
                <StyledPath d="M14294 4151 c-56 -14 -101 -50 -206 -162 -114 -123 -212 -203 -237 -194 -9 4 -39 9 -66 12 -54 6 -83 -11 -71 -42 7 -19 84 -20 133 -3 29 11 35 10 58 -12 14 -13 25 -34 25 -46 0 -13 -25 -77 -55 -144 -31 -66 -60 -142 -67 -169 -10 -44 -9 -52 13 -92 18 -33 37 -51 78 -71 30 -16 69 -28 86 -28 80 0 235 123 373 298 36 45 66 82 68 82 1 0 2 -35 2 -78 -1 -95 23 -157 85 -220 71 -72 166 -97 272 -68 184 49 421 267 665 611 156 220 271 328 317 299 58 -36 12 -137 -280 -614 -83 -135 -157 -255 -165 -267 l-14 -23 105 0 105 0 63 108 c105 178 194 303 262 371 l65 64 -5 -80 c-7 -105 10 -145 72 -169 60 -23 126 -6 205 51 54 41 190 188 190 207 0 19 -22 5 -57 -39 -74 -92 -128 -145 -170 -170 -148 -87 -242 -18 -212 154 14 78 17 81 151 168 166 108 228 170 228 228 0 32 -29 50 -67 41 -86 -20 -193 -123 -264 -256 -30 -55 -67 -104 -116 -152 -40 -40 -73 -71 -73 -70 0 1 20 40 44 88 69 135 84 242 46 322 -20 41 -66 74 -104 74 -64 0 -190 -124 -391 -385 -167 -217 -356 -412 -460 -472 -155 -91 -286 -96 -348 -12 -25 35 -25 129 1 197 34 90 91 182 112 182 36 0 325 78 407 109 44 18 108 49 141 71 128 82 158 207 67 278 -79 62 -271 16 -500 -119 -164 -97 -248 -178 -335 -319 -109 -177 -301 -395 -387 -439 -67 -33 -133 -25 -133 17 0 8 22 64 49 126 62 141 75 185 67 229 -8 43 -68 107 -128 138 -39 20 -41 23 -24 33 45 26 136 108 201 181 39 43 90 91 114 107 55 34 105 37 121 7 18 -32 -4 -72 -66 -119 -80 -61 -104 -119 -64 -155 29 -26 83 -22 128 8 62 41 120 141 122 210 0 38 -24 93 -48 106 -28 15 -92 21 -128 12z m954 -33 c17 -17 15 -64 -4 -104 -23 -49 -118 -132 -208 -183 -119 -67 -357 -157 -339 -128 79 133 310 358 418 408 46 21 115 25 133 7z"/>
              </g>
            </svg>
          <LogoutBtn onClick={logoutOnclickHandler}>로그아웃</LogoutBtn>
        </StyledNavBar>
      );
  }
};

export default NavBar;
