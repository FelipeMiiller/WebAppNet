namespace AppNet.Model;

public class Category
{
    public Guid Id { set; get; }
    public string Nome { set; get; }
    public DateTime CreationDate { get; set; }


    public Category(string nome)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        CreationDate = DateTime.Now;
    }


    public Category()
    {
        Id = Guid.NewGuid();
        Nome = string.Empty;
        ;
        CreationDate = DateTime.Now;
    }
}