public class Main {
    public static void main(String[] args) {

        LinkedList list = new LinkedList();
        list.append(10);
        list.append(20);
        list.append(30);
        list.print();

        System.out.println(list.head.data);
    }
}