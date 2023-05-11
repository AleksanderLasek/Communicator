#ifndef SZNUR_H
#define SZNUR_H
#include <iostream>

using namespace std;

struct Sznur {
private:
    struct Node{
        int data;
        Node*next;
        Node(int data, Node*next = nullptr): data(data), next(next) {}
    };
    Node*start = nullptr;
    int counter = 0;
public:
    void wypisz()
    {
        if(start != nullptr)
        {
            Node*temp = start;
            while(temp != nullptr)
            {
                cout << " [" << temp->data << "] ";
                temp=temp->next;
            }
            cout << endl;
        }
    }
    void wstaw(int number)
    {
        Node*newOne = new Node(number);
        if(start == nullptr)
        {
            start = newOne;
        }
        else
        {
            Node*temp = start;
            if(number < temp->data)
            {
                newOne->next=temp;
                start=newOne;
            }
            else
            {

                while(temp->next != nullptr && (temp->next->data < number))
                {
                    temp=temp->next;
                }
                newOne->next=temp->next;
                temp->next = newOne;
            }
        }
        counter++;
    }
    void usun(int M)
    {
        if(M <= counter)
        {
            float sum = 0;
            float ile = 0;
            Node*temp = start;
            for(int i=1; i<M; i++)
            {
                temp=temp->next;
            }
            while(temp != nullptr)
            {
                sum=sum+temp->data;
                ile++;
                for(int i=0; i<M; i++)
                {
                    if(temp == nullptr) break;
                    temp=temp->next;
                }
            }
            temp = start;
            float sr = sum/ile;
            Node*prev;
            while(temp != nullptr)
            {
                Node*killer;
                if(temp->data > sr)
                {
                    if(temp == start)
                    {
                        killer = start;
                        start = start->next;
                        temp=start;
                        delete killer;
                    }
                    else
                    {
                        killer=temp;

                        prev->next = temp->next;
                        temp=prev->next;
                        delete killer;

                    }
                }
                else
                {
                    prev=temp;
                    temp=temp->next;
                }
            }
        }
    }
    void przeniesTrojki()
    {
        Node*pierwszyT=start;
        Node*drugiT=start->next;
        Node*trzeciT=start->next->next;
        Node*prev;
        while(pierwszyT != nullptr && drugiT != nullptr && trzeciT != nullptr)
        {
            if(pierwszyT->data != drugiT->data && drugiT->data != trzeciT->data && pierwszyT->data != trzeciT->data)
            {
                Node*temp=start;
                while(temp->next != nullptr)
                {
                    temp=temp->next;
                }
                Node*pierwszyTnew = new Node(pierwszyT->data);
                Node*drugiTnew = new Node(drugiT->data);
                Node*trzeciTnew = new Node(trzeciT->data);
                temp->next = trzeciTnew;
                trzeciTnew->next = drugiTnew;
                drugiTnew->next = pierwszyTnew;
                if(pierwszyT == start)
                {
                    Node*killer;
                    for(int i=0; i<3; i++){
                        killer = start;
                        start=start->next;
                        delete killer;
                    }
                    pierwszyT=start;
                    drugiT=start->next;
                    trzeciT=start->next->next;
                }
                else
                {
                    prev->next=trzeciT->next;
                    Node*helper=prev->next;
                    pierwszyT=helper;
                    drugiT=helper->next;
                    trzeciT=helper->next->next;
                }
            }
            else
            {
                prev=trzeciT;
                for(int i=0; i<3; i++)
                {
                    pierwszyT=pierwszyT->next;
                    drugiT=drugiT->next;
                    trzeciT=trzeciT->next;
                }
            }

        }
    }
};

#endif // SZNUR_H
