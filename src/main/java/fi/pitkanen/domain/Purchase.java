package fi.pitkanen.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Purchase {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;
	private String date;
	private String store;
	private double sum;
	private String info;

	public Purchase() {
	}

	public Purchase(Long id, String name, String date, String store,
			double sum, String info) {
		super();
		this.id = id;
		this.name = name;
		this.date = date;
		this.store = store;
		this.sum = sum;
		this.info = info;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	@Override
	public String toString() {
		return "Purchase [id=" + id + ", name=" + name + ", date=" + date
				+ ", store=" + store + ", sum=" + sum + ", info=" + info + "]";
	}

}
