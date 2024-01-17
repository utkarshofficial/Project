# def convert(i):
#     return '''
#     <img
#     class="markings2"
#     src="./src/images/bare_raber2marked_{0}.png";
#     />
#     '''.format(i)

# all = ""
# for i in range(1, 18):
#     all = all + convert(i)

# print(all)

# project files line
s = '''72
15
44
249
1137
28
1862
123
39
85
141
117
106
162'''

s = s.split('\n')
num = 0
for i in s:
    num = num + int(i)

print(num)
