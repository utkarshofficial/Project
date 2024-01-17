style = '''
box-sizing content-box
display block
height 26px
margin-right 8px
min-width 26px
position relative
width 26px
z-index 2
font-family Roboto, Noto, sans-serif
font-feature-settings normal
font-kerning auto
font-optical-sizing auto
font-size 14px
font-stretch 100%
font-style normal
font-variant-alternates normal
font-variant-caps normal
font-variant-east-asian normal
font-variant-ligatures normal
font-variant-numeric normal
font-variant-position normal
font-variation-settings normal
font-weight 600
line-height 26px
text-align center
text-decoration-thickness auto
text-size-adjust 100%
vertical-align middle
word-break break-word
color rgb(255, 255, 255)
background-attachment scroll
background-clip border-box
background-color rgb(26, 115, 232)
background-image none
background-origin padding-box
background-position-x 0%
background-position-y 0%
background-repeat-x repeat
background-repeat-y repeat
background-size auto
cursor pointer
transition-behavior normal
transition-delay 0s
transition-duration 0.3s
transition-property all
transition-timing-function ease-in-out
content counter(li-count)
-webkit-font-smoothing antialiased
border-bottom-left-radius 50%
border-bottom-right-radius 50%
border-top-left-radius 50%
border-top-right-radius 50%
list-style-image none
list-style-position outside
list-style-type none
-webkit-box-direction normal
'''

ans = style.replace(', ',',').replace(' ',': ').replace('\n',';\n')
print(ans)