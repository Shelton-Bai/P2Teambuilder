package com.sheltonbai.p2API.global;
import java.util.Objects;

public class DescriptionRequest {
	private String alias;
	private String desc;
	private String shortDesc;


	public DescriptionRequest() {
	}

	public DescriptionRequest(String alias, String desc, String shortDesc) {
		this.alias = alias;
		this.desc = desc;
		this.shortDesc = shortDesc;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getDesc() {
		return this.desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getShortDesc() {
		return this.shortDesc;
	}

	public void setShortDesc(String shortDesc) {
		this.shortDesc = shortDesc;
	}

	public DescriptionRequest alias(String alias) {
		setAlias(alias);
		return this;
	}

	public DescriptionRequest desc(String desc) {
		setDesc(desc);
		return this;
	}

	public DescriptionRequest shortDesc(String shortDesc) {
		setShortDesc(shortDesc);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof DescriptionRequest)) {
			return false;
		}
		DescriptionRequest descriptionRequest = (DescriptionRequest) o;
		return Objects.equals(alias, descriptionRequest.alias) && Objects.equals(desc, descriptionRequest.desc) && Objects.equals(shortDesc, descriptionRequest.shortDesc);
	}

	@Override
	public int hashCode() {
		return Objects.hash(alias, desc, shortDesc);
	}

	@Override
	public String toString() {
		return "{" +
			" alias='" + getAlias() + "'" +
			", desc='" + getDesc() + "'" +
			", shortDesc='" + getShortDesc() + "'" +
			"}";
	}
	
}
