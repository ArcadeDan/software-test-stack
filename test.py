import sys



def test_py_integration(a, b):
    return a + b


if __name__ == '__main__':

    filename = 'dump.txt'

    with open(filename, 'w') as f:
        f.write('Hello')

    a = int(sys.argv[1]) 
    b = int(sys.argv[2])
    result = test_py_integration(a, b)
    print(result)

