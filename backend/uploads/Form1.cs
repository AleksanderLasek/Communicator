using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp3
{
    public partial class Form1 : Form
    {
        Graphics g;
        int paletkaX;
        int X=0, Y=0;
        int directionX = 1, directionY = 1;
        Rectangle Paletka;
        Rectangle Pilka;
        List<Rectangle> Bricki;
        public Form1()
        {
            InitializeComponent();
            Bricki = new List<Rectangle>();
            {
                int c = pictureBox1.Width / 100;
                for(int i = 0; i<c; i++)
                {
                    for(int j = 0; j<2; j++)
                    {
                        Bricki.Add(new Rectangle(i * 100 + 1, j * 35, 98, 30));
                    }
                }
            }
            Paletka = new Rectangle(pictureBox1.Width / 2 - 100, pictureBox1.Height - 80, 200, 50);
            Pilka = new Rectangle(0, 0, 30, 30);
            paletkaX = pictureBox1.Width / 2 - 100;
            pictureBox1.Image = new Bitmap(pictureBox1.Width, pictureBox1.Height);
            g = Graphics.FromImage(pictureBox1.Image);
            RefreshPaletka();
            

        }

        public void RefreshPaletka()
        {
            g.Clear(Color.White);
            g.FillEllipse(new SolidBrush(Color.Black), Pilka);
            g.FillRectangle(new SolidBrush(Color.Red), Paletka);
            foreach(Rectangle b in Bricki)
            {
                g.FillRectangle(new SolidBrush(Color.BlueViolet), b);
            }
            pictureBox1.Refresh();
        }
  
        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Left)
            {
                if(Paletka.X != 0)
                {
                    Paletka.X -= 20;
                }
            }
            else if(e.KeyCode == Keys.Right)
            {
                if(Paletka.X != pictureBox1.Width - 200)
                {
                    Paletka.X += 20;
                }
            }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (Pilka.Y > pictureBox1.Width - 30) 
            {
                timer1.Stop();
                MessageBox.Show("przegrales fiutku");
                
            }
            if (Pilka.X >= pictureBox1.Width - 30 || Pilka.X < 0)
            {
                directionX = directionX * (-1);
            }
            if ( Pilka.Y < 0 || Pilka.IntersectsWith(Paletka))
            {
                directionY = directionY * (-1);
            }
            Rectangle chuj = Rectangle.Empty;
            foreach (Rectangle b in Bricki)
            {
                if (b.IntersectsWith(Pilka))
                {
                    directionY = directionY * (-1);
                    chuj = b;
                }
            }
            Bricki.Remove(chuj);
            Pilka.X += 3 * directionX;
            Pilka.Y += 3 * directionY;
            RefreshPaletka();
        }
    }
}
