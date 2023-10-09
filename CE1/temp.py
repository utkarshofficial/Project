def convert(i):
    return '''
    <img
    class="markings2"
    src="./src/images/bare_raber2marked_{0}.png";
    />
    '''.format(i)

all = ""
for i in range(1, 18):
    all = all + convert(i)

print(all)