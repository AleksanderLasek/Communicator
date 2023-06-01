#include <iostream>

using namespace std;

void prim(int** graph, int n)
{
    int* key = new int[n];
    bool* isAdded = new bool[n];

    for (int i = 0; i < n; i++)
    {
        key[i] = INT_MAX;
        isAdded[i] = false;
    }
    key[0] = 0;

    for (int i = 0; i < n - 1; i++)
    {
        int u = -1;
        for (int j = 0; j < n; j++)
        {
            if (!isAdded[j] && (u == -1 || key[j] < key[u]))
            {
                u = j;
            }
        }
        isAdded[u] = true;

        for (int v = 0; v < n; v++)
        {
            if (graph[u][v] && !isAdded[v] && graph[u][v] < key[v])
            {
                key[v] = graph[u][v];
            }
        }
    }
    for (int i = 1; i < n; i++)
    {
        cout << i << " - " << key[i] << endl;
    }

    delete[] key;
    delete[] isAdded;
}

int main()
{
    int n = 4;
    int** graph = new int*[n];
    for (int i = 0; i < n; i++) {
        graph[i] = new int[n];
    }

    graph[0][1] = 2;
    graph[0][3] = 6;
    graph[1][0] = 2;
    graph[1][2] = 3;
    graph[1][3] = 8;
    graph[2][1] = 3;
    graph[3][0] = 6;
    graph[3][1] = 8;

    prim(graph, n);

    for (int i = 0; i < n; i++) {
        delete[] graph[i];
    }
    delete[] graph;

    return 0;
}
